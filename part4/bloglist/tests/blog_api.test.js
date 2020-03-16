/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const helper = require('./test_helper')
const app = require('../app')


const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let token = null

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('dummy returns one', () => {
  const blogs = []
  const result = helper.dummy(blogs)
  expect(result).toEqual(1)
})
describe('content of blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('first blog is written by morten sund', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].author).toBe('Morten Sund')
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const blogs = response.body.map((b) => b.title);

    expect(blogs).toContain(
      'Bloggen om livet',
    )
  })
})

describe('functionality of backend', () => {
  test('a valid blog can be added', async () => {
    await api
      .post('/api/users')
      .send({
        username: 'test',
        name: 'test',
        passwordHash: 'test',
      })
      .expect(200)

    const login = await api
      .post('/api/login')
      .send({
        username: 'test',
        password: 'test',
      })
    token = login.body.token

    const newBlog = {
      title: 'Funksjonsbloggen',
      author: 'Helsinkigutten',
      url: 'function.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map((b) => b.title)
    expect(contents).toContain(
      'Funksjonsbloggen',
    )
  })

  test('a blog without author is not added', async () => {
    await api
      .post('/api/users')
      .send({
        username: 'test',
        name: 'test',
        passwordHash: 'test',
      })
      .expect(200)

    const login = await api
      .post('/api/login')
      .send({
        username: 'test',
        password: 'test',
      })
    token = login.body.token

    const newBlog = {
      url: 'vvv.vvv.v',
    }

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })

  test('a specific blog can be viewed', async () => {
    const blogs = await helper.blogsInDb()
    const blogToView = blogs[0]

    const viewedBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(viewedBlog.body).toEqual(blogToView)
  })

  test('a blog can not be deleted by id by not owner', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `bearer ${token}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
      blogsAtStart.length,
    )

    // const ids = blogsAtEnd.map((b) => b.id)
    // expect(ids).not.toContain(blogToDelete.id)
  })

  test('a blog without likes is initialized to zero', async () => {
    const blogsAtStart = await helper.blogsInDb()
    await api
      .post('/api/users')
      .send({
        username: 'test',
        name: 'test',
        passwordHash: 'test',
      })
      .expect(200)

    const login = await api
      .post('/api/login')
      .send({
        username: 'test',
        password: 'test',
      })
    token = login.body.token
    const newBlog = {
      title: 'Hanna B',
      author: 'Hanna Brodersen',
      url: 'www.v.www',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtStart.length).toEqual(blogsAtEnd.length - 1)

    const blogs = await helper.blogsInDb()
    expect(blogs[blogs.length - 1].likes).toEqual(0)
  })

  test('existing blog can be edited', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blog = blogsAtStart[blogsAtStart.length - 1]
    const editedBlog = {
      ...blog,
      likes: 5,
    }

    await api
      .put(`/api/blogs/${blog.id}`)
      .set('Authorization', token)
      .send(editedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]

    expect(blogsAtStart.length).toEqual(blogsAtEnd.length)
    expect(blog.likes).not.toEqual(lastBlog.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

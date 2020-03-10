const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Mortens testblogg",
    author: "Morten Sund",
    url: "www.example.com",
    likes: 10,
  },
  {
    title: "Per Viskelers testblogg",
    author: "Per Viskeler",
    url: "www.per-v.com",
    likes: 0,
  },
  {
    title: "Bloggen om livet",
    author: "Atle Patle",
    url: "www.livet.no",
    likes: 0,
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})
describe('content of blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/bloglist/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are three blogs', async () => {
    const response = await api.get('/bloglist/api/blogs')
    
    expect(response.body.length).toBe(3)
  })

  test('first blog is written by morten sund', async () => {
    const response = await api.get('/bloglist/api/blogs')

    expect(response.body[0].author).toBe('Morten Sund')
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/bloglist/api/blogs')
    
    const blogs = response.body.map(b => b.title)
    
    expect(blogs).toContain(
      'Bloggen om livet'
    )
  })
})

describe('functionality of backend', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "Funksjonsbloggen",
      author: "Helsinkigutten",
      url: "function.com",
      likes: 0,
    }

    await api
      .post('/bloglist/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/bloglist/api/blogs')

    const contents = response.body.map(b => b.title)

    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(contents).toContain(
      'Funksjonsbloggen'
    )

  })

  

})

afterAll(() => {
  mongoose.connection.close()
})

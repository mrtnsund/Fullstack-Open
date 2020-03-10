const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/bloglist/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are one blog', async () => {
  const response = await api.get('/bloglist/api/blogs')
  
  expect(response.body.length).toBe(1)
})

test('first blog is written by morten sund', async () => {
  const response = await api.get('/bloglist/api/blogs')

  expect(response.body[0].author).toBe('morten sund')
})

afterAll(() => {
  mongoose.connection.close()
})


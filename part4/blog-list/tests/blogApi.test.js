const mongoose = require('mongoose')
const api = require('supertest')(require('../app'))
const Blog = require('../models/blog')

const helper = require('./test_helper')

beforeEach(async () => {
  console.log('init the test DB...')
  await Blog.deleteMany()
  await Blog.insertMany(helper.initBlogs)
}, 10000)

describe('API TEST', () => {

  // ex 4.8
  test('verified that the numbers of blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initBlogs.length)
  })


  // ex 4.9
  test('verify that every blog has unique id', async () => {
    const response = await api.get('/api/blogs')
    for (let blog of response.body) {
      expect(blog.id).toBeDefined()
    }
  })


  // ex 4.10
  test('succeeds to create a new blog', async () => {
    const newBlog = {
      title: 'My memo link',
      author: 'YaoSen Wang',
      url: 'https://writee.org/huang-juan',
      likes: 0
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDB = await helper.blogsInDB()
    expect(blogsInDB).toHaveLength(helper.initBlogs.length + 1)
    expect(blogsInDB).toContainEqual(response.body)
  })


  // ex 4.11
  test('succeeds to create a blog that hasn\'t like', async () => {
    const newBlog = {
      title: 'My memo link',
      author: 'YaoSen Wang',
      url: 'https://writee.org/huang-juan'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })


  // ex 4.12
  test('failed with the title or url properties are missing', async () => {
    const newBlog = {
      author: 'YaoSen Wang',
      url: 'https://writee.org/huang-juan'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })


  // ex 4.13
  test('succeeds to delete a blog by id', async () => {
    const deletedBlog = helper.initBlogs[Math.floor(Math.random * helper.initBlogs.length)]
    await api
      .delete(`/api/blogs/${deletedBlog._id}`)
      .expect(204)

    expect(await helper.blogsInDB()).not.toContainEqual(deletedBlog)
  })


  // ex 4.14
  test('succeeds to update the number', async () => {
    const startBlog = helper.initBlogs[Math.floor(Math.random * helper.initBlogs.length)]
    const newBlog = { ...startBlog, likes: startBlog.likes + 1 }

    const response = await api
      .put(`/api/blogs/${newBlog._id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(newBlog.likes)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
  console.log('mongo db is closed!')
}, 10000)

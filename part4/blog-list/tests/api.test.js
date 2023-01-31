const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')

const api = require('supertest')(app)
const helper = require('./test_helper')


describe('API TEST', () => {

  // beforeEach(async () => {
  //   console.log('a test is passing...')
  //   await Blog.deleteMany()
  //   for (let blog of helper.initBlogs) {
  //     await new Blog(blog).save()
  //   }
  // }, 100000)


  // ex 4.8
  test('the numbers of blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initBlogs.length)
  })


  // ex 4.9
  test('Every blog has unique id', async () => {
    const response = await api.get('/api/blogs')
    for (let blog of response.body) {
      expect(blog.id).toBeDefined()
    }
  })


  // ex 4.10
  test('create a new blog', async () => {
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
  test('create a blog that hasn\'t like', async () => {
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
  test('the title or url properties are missing', async () => {
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
  test('delete a blog by id', async () => {
    const deletedBlog = helper.initBlogs[0]
    await api
      .delete(`/api/blogs/${deletedBlog._id}`)
      .expect(204)

    expect(await helper.blogsInDB()).not.toContainEqual(deletedBlog)
  })


  // ex 4.14
  test('update the number of likes for a blog post', async () => {
    const startBlog = helper.initBlogs[1]
    const newBlog = { ...startBlog, likes: startBlog.likes + 1 }

    const response = await api
      .put(`/api/blogs/${newBlog._id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(newBlog.likes)
  }, 10000)

  
  afterAll(async () => {
    await mongoose.connection.close()
    console.log('mongo db is closed!')
  }, 10000)
})


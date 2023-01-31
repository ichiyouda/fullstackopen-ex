const blogRoute = require('express').Router()
const Blog = require('../models/blog')

blogRoute.get('/', (_request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRoute.post('/', (request, response) => {
  let postBlog = request.body
  const keys = Object.keys(postBlog)

  // the title or url properties are missing
  if (!(keys.includes('url') && keys.includes('title'))) {
    response.status(400).send({ error: 'bad request' })
  } else {
    if (!keys.includes('likes')) {
      postBlog = { ...postBlog, likes: 0 }
    }
    const blog = new Blog(postBlog)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  }

})

module.exports = blogRoute
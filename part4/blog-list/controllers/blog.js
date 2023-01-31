const blogRoute = require('express').Router()
const Blog = require('../models/blog')

blogRoute.get('/', async (_request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})


blogRoute.post('/', async (request, response) => {
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
    const savedB = await blog.save()
    response.json(savedB)
  }
})

blogRoute.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})


blogRoute.put('/:id', async (req, res) => {
  const updatedB = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(updatedB)

})

module.exports = blogRoute
const blogRoute = require('express').Router()

const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRoute.get('/', async (_request, res) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })
  res.json(blogs)
})

blogRoute.post('/', middleware.userExtractor, async (req, res) => {
  const user = req.user
  if (!user) {
    res.status(401).send({ error: 'not permitted operation' })
  } else {
    const blog = new Blog({
      ...req.body,
      likes: req.body.likes ? req.body.likes : 0,
      user: user._id,
    })
    const savedBlog = await (await blog.save()).populate('user', { blogs: 0 })

    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    res.json(savedBlog)
  }
})

blogRoute.delete('/:id', middleware.userExtractor, async (req, res) => {
  const user = req.user
  if (!user) {
    res.status(401).send({ error: 'not permitted operation' })
  } else {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      res.status(204).end()
    } else {
      await Blog.findByIdAndRemove(req.params.id)

      user.blogs = user.blogs.filter((b) => b.toString() !== req.params.id)
      await user.save()

      res.status(204).end()
    }
  }
})

blogRoute.put('/:id', async (req, res) => {
  const updatedB = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  const resB = await updatedB.populate('user', { blogs: 0 })
  res.status(201).json(resB)
})

blogRoute.post('/:id/comments', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  blog.comments = blog.comments.concat(req.body.content)
  const savedB = await blog.save()
  res.json(savedB.comments)
})

module.exports = blogRoute

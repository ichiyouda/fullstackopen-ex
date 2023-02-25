const blogRoute = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogRoute.get('/', async (_request, res) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })
  res.json(blogs)
})

blogRoute.post('/', async (req, res) => {
  const userId = req.user
  if (!userId) {
    res.status(401).send({ error: 'invalid  token' })
  } else {
    const user = await User.findById(userId)
    if (!user) {
      // eslint-disable-next-line quotes
      res.status(404).send({ error: "user can't find" })
    } else {
      const blog = new Blog({
        ...req.body,
        likes: !req.body.likes ? 0 : req.body.likes,
        user: user._id,
      })
      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(blog._id)
      await user.save()

      res.json(savedBlog)
    }
  }
})

blogRoute.delete('/:id', async (req, res) => {
  const userId = req.user
  if (!userId) {
    res.status(401).send({ error: 'invalid token' })
  } else {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      res.status(204).end()
    } else if (userId !== blog.user.toString()) {
      res.status(401).send({ error: 'invalid user' })
    } else {
      await Blog.findByIdAndRemove(req.params.id)

      const user = await User.findById(userId)
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
  res.json(updatedB)
})

blogRoute.post('/:id/comments', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  blog.comments = blog.comments.concat(req.body.content)
  const savedB = await blog.save()
  res.json(savedB.comments)
})

module.exports = blogRoute

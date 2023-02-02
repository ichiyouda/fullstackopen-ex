const blogRoute = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogRoute.get('/', async (_request, res) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })
  console.log(`blogs ${blogs.length}`)
  res.json(blogs)
})


blogRoute.post('/', async (req, res) => {
  const userId = req.user
  if (!userId) {
    res.status(401).send({ error: 'invalid token' })
  } else {
    const { title, url, likes } = req.body

    // the title or url properties are missing
    if (!(title && url)) {
      res.status(400).send({ error: 'bad request' })
    } else {
      // likes property is missing
      if (!likes) {
        req.body = { ...req.body, likes: 0 }
      }

      // if can't find the user ?
      const user = await User.findById(userId)
      if (!user) {
        res.status(404).send({ error: 'user can\'t find' })
      } else {
        const blog = new Blog({ ...req.body, user: user._id })
        const savedBlog = await blog.save()

        // update user
        user.blogs = user.blogs.concat(blog._id)
        await user.save()

        res.json(savedBlog)
      }
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
      res.status(204).end()
    }
  }
})


blogRoute.put('/:id', async (req, res) => {
  const updatedB = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(updatedB)

})

module.exports = blogRoute
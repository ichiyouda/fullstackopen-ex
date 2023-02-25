const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (_req, res) => {
  const users = await User.find({}).populate('blogs', { likes: 0, user: 0 })
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body
  if (!password.match(/^[a-zA-Z]\w{3,}$/)) {
    res.status(400).send({
      error: '以字母开头，长度大於三，只能包含字母、数字和下划线',
    })
  } else {
    const passwordHash = await bcrypt.hash(password, 13)

    const user = new User({
      username,
      passwordHash,
      name,
    })

    const savedUser = await user.save()
    res.json(savedUser)
  }
})

module.exports = userRouter

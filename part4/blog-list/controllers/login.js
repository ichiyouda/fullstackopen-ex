const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const config = require('../utils/config')


loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    res.status(401).send({ error: 'invalid username or password' })
  } else {
    const userForToken = { username, id: user._id }
    const token = jwt.sign(
      userForToken,
      config.SECRET,
      { expiresIn: 60 * 60 })

    res.status(200).send(
      {
        token,
        username,
        name: user.name
      })
  }
})


module.exports = loginRouter


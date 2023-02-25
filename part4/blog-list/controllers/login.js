const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body
  console.log('password', password)
  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)
  if (!passwordCorrect) {
    res.status(401).send({ error: 'invalid username or password' })
  } else {
    const userForToken = { username, id: user._id }
    const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 })

    res.status(200).send({
      token,
      username,
      name: user.name,
    })
  }
})

loginRouter.post('/tokenLife', async (req, res) => {
  const useId = req.user
  if (!useId) {
    res.status(401).send({ error: 'token is expired' })
  } else {
    res.status(200).end()
  }
})

module.exports = loginRouter

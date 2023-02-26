const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')
const config = require('../utils/config')

const userExtractor = (req, _res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    const decodedToken = jwt.verify(
      authorization.replace('Bearer ', ''),
      config.SECRET
    )
    if (decodedToken.id) {
      req.user = decodedToken.id
    } else {
      req.user = null
    }
  } else {
    req.user = null
  }

  next()
}

const requestLogger = (req, _res, next) => {
  logger.info(`${req.method} ${req.path} - ${Date().slice(16, 24)}`)
  next()
}

const unknownEndpoint = (_req, res) => {
  return res.status(404).send({ error: 'unkonwn Endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).send({ error: 'token missing or invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(400).send({ error: 'Token is expired' })
  }
  next(error)
}

module.exports = { unknownEndpoint, requestLogger, errorHandler, userExtractor }

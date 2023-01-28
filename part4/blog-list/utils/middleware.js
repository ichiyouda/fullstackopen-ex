const { info } = require('./logger')

const requestLogger = (req, _res, next) => {
  info('Method:', req.method)
  info('Path:', req.path)
  info('Body:', req.body)
  info('---')
  next()
}


const unknownEndpoint = (_req, res) => {
  return res.status(404).send({ error: 'unkonwn Endpoint' })
}



module.exports = { unknownEndpoint, requestLogger }
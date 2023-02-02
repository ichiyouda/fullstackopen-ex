const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('express-async-errors')
const cors = require('cors')

const config = require('./utils/config')
const logger = require('./utils/logger')

const blogRoute = require('./controllers/blog')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)
logger.info('connecting to mongoDB.')
const mongoUrl = config.MONGO_URI

mongoose.connect(mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB...')
  })
  .catch(err => {
    logger.error('error connecting to MongoDb', err.message)
  })


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login', require('./controllers/login'))
app.use('/api/blogs', middleware.userExtractor, blogRoute)
app.use('/api/users', require('./controllers/user'))

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app
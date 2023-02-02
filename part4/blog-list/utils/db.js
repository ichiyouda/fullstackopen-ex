const mongoose = require('mongoose')

const config = require('../utils/config')
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const User = require('../models/user')

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


// Blog.deleteMany()
//   .then(() => {
//     logger.info('succeed to delete all blogs')
//   })
//   .catch(err => {
//     logger.error('error connecting to MongoDb', err.message)
//   })

//   User.deleteMany()
//   .then(() => {
//     logger.info('succeed to delete all User')
//   })
//   .catch(err => {
//     logger.error('error connecting to MongoDb', err.message)
//   })


//   setTimeout(() => {
//     mongoose.connection.close()
//     logger.info('close db collection')
//   }, 5000)

const deleteAll = async () => {
  await Blog.deleteMany()
  logger.info('succeed to delete all blogs')
  await User.deleteMany()
  logger.info('succeed to delete all users')
  await mongoose.connection.close()
}


const deleteBlogWithNullUser = async () => {
  const blogs = await Blog.find({})
  for (let b of blogs) {
    if (!(await User.findById(b.user))) {
      await Blog.findByIdAndRemove(b.id)
    }
  }
  logger.info('succeed to delete Blog With Null User')
  await mongoose.connection.close()
  logger.info('close the connection of db')
}


module.exports = { deleteAll, deleteBlogWithNullUser }
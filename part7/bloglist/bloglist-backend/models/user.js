const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        return /^[A-Za-z0-9]{3,}$/.test(v)
      },
      message: (props) => `${props.value} is not a valid usename!`,
    },
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

mongoose.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)

import { configureStore } from '@reduxjs/toolkit'

import blogListReduce from './reduces/blogListReduce'
import userReduce from './reduces/userReduce'
import usersReduce from './reduces/usersReduce'
import notifyReduce from './reduces/notifyReduce'

const store = configureStore({
  reducer: {
    blogs: blogListReduce,
    user: userReduce,
    users: usersReduce,
    notify: notifyReduce,
  },
})

export default store

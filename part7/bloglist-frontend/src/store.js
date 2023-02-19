import { configureStore } from '@reduxjs/toolkit'

import blogListReduce from './reduces/blogListReduce'
import userReduce from './reduces/userReduce'
import notifyReduce from './reduces/notifyReduce'

const store = configureStore({
  reducer: {
    blogs: blogListReduce,
    user: userReduce,
    notify: notifyReduce,
  },
})

export default store

import { configureStore } from '@reduxjs/toolkit'

import anecdotReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notifyReducer from './reducers/notifyReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdotReducer,
    filter: filterReducer,
    notification: notifyReducer
  }
})

export default store
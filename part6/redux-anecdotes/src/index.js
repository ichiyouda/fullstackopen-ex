import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'

import anecdotReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'


const store = configureStore({ reducer: {
  anecdotes: anecdotReducer,
  filter: filterReducer
} })

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
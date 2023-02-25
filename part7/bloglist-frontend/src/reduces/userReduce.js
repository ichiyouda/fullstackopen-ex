import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { notify } from './notifyReduce'

const initialState = {}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

const { setUser } = userSlice.actions

export const login = (username, password) => {
  return async (dispatch) => {
    let loginUser
    try {
      loginUser = await blogService.login({ username, password })
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(notify('red', 'Wrong username or password', 5000))
        throw err.message
      }
    }
    window.localStorage.setItem('LoginedUser', JSON.stringify(loginUser))
    blogService.setToken(loginUser.token)
    dispatch(setUser(loginUser))
  }
}

export const detectLoggined = () => {
  return (dispatch) => {
    const useStr = window.localStorage.getItem('LoginedUser')
    if (useStr !== null) {
      const user = JSON.parse(useStr)
      blogService.setToken(user.token)
      // todo: verify token
      dispatch(setUser(user))
    } else {
      console.log('localStorage has no value for key of loginedUser')
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(setUser({}))
    window.localStorage.clear()
  }
}

export const getUsers = async () => {
  const users = await blogService.getAllUser()
  return users
}

export default userSlice.reducer

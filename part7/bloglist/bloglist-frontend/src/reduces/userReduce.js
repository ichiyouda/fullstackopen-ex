import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import usersService from '../services/users'
import userService from '../services/user'
import storageService from '../services/storage'
import { notify } from './notifyReduce'

const initialState = {}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

const { setUser } = slice.actions

export const login = (username, password) => {
  return async (dispatch) => {
    let loginUser
    try {
      loginUser = await loginService.login({ username, password })
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(notify('red', 'Wrong username or password', 5000))
        throw err.message
      }
    }
    storageService.setItem(JSON.stringify(loginUser))
    userService.setToken(loginUser.token)
    dispatch(setUser(loginUser))
  }
}

export const detectLoggined = () => {
  return (dispatch) => {
    const useStr = storageService.getItem()
    if (useStr !== null) {
      // todo: verify token
      const user = JSON.parse(useStr)
      userService.setToken(user.token)
      dispatch(setUser(user))
    } else {
      console.log('please login in')
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(setUser({}))
    storageService.clear()
  }
}

export const getUsers = async () => {
  const users = await usersService.getAll()
  return users
}

export default slice.reducer

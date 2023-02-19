import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { notify } from '../reduces/notifyReduce'

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
    try {
      const loginUser = await blogService.login({ username, password })
      window.localStorage.setItem('LoginedUser', JSON.stringify(loginUser))
      blogService.setToken(loginUser.token)
      dispatch(setUser(loginUser))
    } catch (error) {
      console.error(error.response.data.error)
      dispatch(notify('red', 'wrong username or password', 5000))
    }
  }
}

export const detectLoggined = () => {
  return (dispatch) => {
    const useStr = window.localStorage.getItem('LoginedUser')
    if (useStr !== 'undefined') {
      const user = JSON.parse(useStr)
      dispatch(setUser(user))
      blogService.setToken(user.token)
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

export default userSlice.reducer

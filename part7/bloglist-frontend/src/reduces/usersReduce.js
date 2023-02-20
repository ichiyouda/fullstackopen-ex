import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

const { setUsers } = usersSlice.actions

export const getAll = () => {
  return async (dispatch) => {
    const users = await blogService.getAllUser()
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer

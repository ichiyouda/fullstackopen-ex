import { createSlice } from '@reduxjs/toolkit'

const initialState = { msg: '', color: '' }

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    setNotify(state, action) {
      return action.payload
    },
  },
})

const { setNotify } = notifySlice.actions

export const notify = (color, msg, times) => {
  return (dispatch) => {
    dispatch(setNotify({ msg, color }))
    if (times) {
      setTimeout(() => {
        dispatch(setNotify(initialState))
      }, times)
    }
  }
}

export default notifySlice.reducer

import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    notify(state, action) {
      return action.payload
    }
  }
})

export const { notify } = notifySlice.actions

export const setNotification = (content, sec) => {
  return dispatch => {
    dispatch(notify(content))
    setTimeout(() => {
      dispatch(notify(''))
    }, sec * 1000)
  }
}
export default notifySlice.reducer
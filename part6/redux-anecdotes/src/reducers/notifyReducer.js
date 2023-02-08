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

export const {notify} = notifySlice.actions
export default notifySlice.reducer
import { createSlice } from "@reduxjs/toolkit"

const initialState = []


const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    newAnec(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const voted = state.map(anc => anc.id === action.payload
        ? {...anc, votes: anc.votes + 1}
        : anc)
      voted.sort((a, b) => a.votes < b.votes)
      return voted
    },
    setAnec(state, action) {
      return action.payload
    }
  }
})

export const { newAnec, vote, setAnec } = anecdoteSlice.actions
export default anecdoteSlice.reducer
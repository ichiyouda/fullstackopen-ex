import { createSlice } from "@reduxjs/toolkit"
import anecService from '../service/anecdotes'

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

export const initAnecdotes = () => {
  return async dispatch => {
    const anecs = await anecService.getAll()
    dispatch(setAnec(anecs))
  }
}


export const addAnec = content => {
  return async dispatch => {
    const savedAnec = await anecService.addAnec({ content, votes: 0 })
    dispatch(newAnec(savedAnec))
  }
}


export const updateVote = id => {
  return async (dispatch, getState) => {
    const oldAnec = getState().anecdotes.find(anec => anec.id === id)
    await anecService.updateVote({...oldAnec,votes: oldAnec.votes + 1})
    dispatch(vote(id))
  }
}

export default anecdoteSlice.reducer
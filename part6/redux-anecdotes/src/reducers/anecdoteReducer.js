import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: Math.floor(Math.random() * 10)
  }
}


const initialState = anecdotesAtStart.map(asObject)
initialState.sort((a, b) => a.votes < b.votes)


const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    newAnec(state, action) {
      state.push({
        content: action.payload,
        id: getId(),
        votes: 0
      })
    },
    vote(state, action) {
      const voted = state.map(anc => anc.id === action.payload
        ? {...anc, votes: anc.votes + 1}
        : anc)
      voted.sort((a, b) => a.votes < b.votes)
      return voted
    }
  }
})

export const { newAnec, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
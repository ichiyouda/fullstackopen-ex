import { useSelector, useDispatch } from 'react-redux'
import { vote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handlevote = id => {
    dispatch(vote(id))
  }

  const listSty = {
    border: 'solid',
    borderColor: 'green',
    borderWidth: 2,
    padding: 10,
    listStyleType: 'none',
    marginBottom: 4
  }

  return (
    <ul>
      {anecdotes.map(anecdote =>
        <li style={listSty} key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handlevote(anecdote.id)}>vote</button>
          </div>
        </li>
      )}
    </ul>
  )
}


export default AnecdoteList
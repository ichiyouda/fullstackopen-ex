import { useSelector, useDispatch } from 'react-redux'
import { vote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector(state => state)
  const dispatch = useDispatch()

  const handlevote = id => {
    dispatch(vote(id))
  }

  const listSty = {
    border: 'solid',
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 4,
    padding: 10,
    listStyleType: 'none',
    marginBottom: 4
  }

  return (
    <ul>
      {anecdotes.reduce((acc, anecdote) => {
        if (anecdote.content.includes(filter)) {
          return acc.concat(<li style={listSty} key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handlevote(anecdote.id)}>vote</button>
            </div>
          </li>)
        } else {
          return acc
        }
      }, [])}
    </ul>
  )
}


export default AnecdoteList
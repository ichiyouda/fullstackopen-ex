import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import anecService from '../service/anecdotes'
import { vote, setAnec } from "../reducers/anecdoteReducer"
import { notify } from '../reducers/notifyReducer'

const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    anecService.getAll()
      .then(anecs => dispatch(setAnec(anecs)))
  }, [dispatch])

  
  const handlevote = anec => {
    dispatch(vote(anec.id))
    dispatch(notify(anec.content))
    setTimeout(() => {
      dispatch(notify(''))
    }, 5000)

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
              <button onClick={() => handlevote(anecdote)}>vote</button>
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
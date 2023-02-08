import { useDispatch } from 'react-redux'
import { newAnec } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notifyReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = evt => {
    evt.preventDefault()
    const content = evt.target.anec.value
    dispatch(newAnec(content))
    dispatch(notify(content))
    setTimeout(() => {
      dispatch(notify(''))
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name='anec' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
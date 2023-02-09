import { useDispatch } from 'react-redux'

import { addAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifyReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async evt => {
    evt.preventDefault()
    const content = evt.target.anec.value
    evt.target.anec.value = ''

    dispatch(addAnec(content))
    dispatch(setNotification(content, 5))
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
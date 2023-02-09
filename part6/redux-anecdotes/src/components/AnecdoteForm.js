import { useDispatch } from 'react-redux'

import anceService from '../service/anecdotes'
import { newAnec } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notifyReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async evt => {
    evt.preventDefault()
    const content = evt.target.anec.value
    const newObj = await anceService.addAnec({content, votes: 0})
    dispatch(newAnec(newObj))
    dispatch(notify(newObj.content))
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
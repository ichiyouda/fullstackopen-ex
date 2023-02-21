const AnecdoteForm = ({ addA }) => {
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    addA({ content, votes: 0 })
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

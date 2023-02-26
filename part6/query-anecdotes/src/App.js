import { useQuery, useMutation, useQueryClient } from 'react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, update, create } from './requests'
import { useNotifyDis } from './NotifyContextProvider'

const App = () => {
  const queryClient = useQueryClient()
  const notifyDispatch = useNotifyDis()

  const updateMutation = useMutation(update, {
    onSuccess: (savedA) => {
      const anecs = queryClient.getQueryData()
      queryClient.setQueryData(
        'anecs',
        anecs.map((a) => (a.id === savedA.id ? savedA : a))
      )
    },
  })

  const newAMutation = useMutation(create, {
    onSuccess: (savedA) => {
      const anecs = queryClient.getQueryData('anecs')
      queryClient.setQueryData('anecs', anecs.concat(savedA))
    },
    onError: (error) => {
      notifyDispatch({ type: 'setNMsg', payload: error.response.data.error })
    },
  })

  const handleVote = (anecdote) => {
    updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notifyDispatch({
      type: 'setNMsg',
      payload: `anecdote ${anecdote.content} voted`,
    })
  }

  const addA = (anecdote) => {
    newAMutation.mutate(anecdote)
    notifyDispatch({
      type: 'setNMsg',
      payload: `anecdote ${anecdote.content} created`,
    })
  }

  const { isLoading, isError, data, error } = useQuery('anecs', getAll, {
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return null
  } else if (isError) {
    console.error({ Error: error.message })
    return <span>anecdote service not available due to problems in server</span>
  } else {
    const anecdotes = data

    return (
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm addA={addA} />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default App

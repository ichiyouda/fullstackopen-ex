import { useState } from 'react'

const Button = ({ txt, onClick }) => {
  return (
    <button onClick={onClick}>{txt}</button>
  )
}


const MostVote = ({ vote, anecdotes }) => {
  let max = vote[0]
  for (let index = 0; index < vote.length - 1; index++) {
    if (vote[index + 1] >= max) {
      max = vote[index + 1]
    }
  }
  return (
    <>
      <p>{anecdotes[vote.indexOf(max)]}</p>
      <p>has {max} votes</p>
    </>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(anecdotes.map(txt => 0))

  const nextAnecHandle = () => {
    const nextSelected = Math.floor(Math.random() * anecdotes.length)
    if (nextSelected === selected) {
      setSelected((nextSelected + 1) % anecdotes.length)
    } else {
      setSelected(nextSelected)
    }
  }

  const voteHandle = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button txt='vote' onClick={voteHandle} />
      <Button txt='next anecdote' onClick={nextAnecHandle} />

      <h2>Anecdote with most votes</h2>
      <MostVote vote={vote} anecdotes={anecdotes} />
    </div>
  )
}

export default App
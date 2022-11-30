import { useState } from 'react'

const Button = ({ txt, onClick }) => {
  return (
    <button onClick={onClick}>{txt}</button>
  )
}


const StatisticsLine = ({ txt, val }) => {
  return (
    <tr>
      <td>{txt}</td>
      <td>{val}</td>
    </tr>
  )
}


const Statistics = ({ array }) => {
  const [good, neutral, bad] = array
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  } else {
    return (
      <>
        <table>
          <tbody>
          <StatisticsLine txt='good' val={good} />
          <StatisticsLine txt='neutral' val={neutral} />
          <StatisticsLine txt='bad' val={bad} />
          <StatisticsLine txt='all' val={all} />
          <StatisticsLine txt='average' val={(good - bad) / all} />
          <StatisticsLine txt='positive' val={(good / all * 100).toString().slice(0, 4) + '%'} />
          </tbody>
        </table>
      </>
    )
  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button txt='good' onClick={() => setGood(good + 1)} />
      <Button txt='neutral' onClick={() => setNeutral(neutral + 1)} />
      <Button txt='bad' onClick={() => setBad(bad + 1)} />

      <h2>statistics</h2>
      <Statistics array={[good, neutral, bad]} />
    </div>
  )
}

export default App
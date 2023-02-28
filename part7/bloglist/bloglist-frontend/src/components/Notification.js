import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Notify = styled.div`
  font-size: 16px;
  position: sticky;
  top: 10px;
  padding: 1em;
  margin: 1em 0;
  border: 3px solid grey;
  border-radius: 5px;
  background-color: #d3d3d3;
`

const Notification = () => {
  const { msg, color } = useSelector(({ notify }) => notify)
  if (msg === '') {
    return null
  } else {
    return <Notify style={{ borderColor: color, color: color }}>{msg}</Notify>
  }
}

export default Notification

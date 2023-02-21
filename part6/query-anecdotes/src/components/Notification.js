import { useNotifyMsg } from '../NotifyContextProvider'

const Notification = () => {
  const notifyMsg = useNotifyMsg()

  const style = {
    display: 'flex',
    border: 'solid',
    position: 'sticky',
    top: 10,
    left: 10,
    backgroundColor: 'lightgreen',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }
  if (notifyMsg === '') {
    return null
  }
  return <div style={style}>{notifyMsg}</div>
}

export default Notification

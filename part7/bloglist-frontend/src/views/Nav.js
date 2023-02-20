import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../reduces/userReduce'

const Nav = () => {
  const { user } = useSelector((s) => s)
  const dispatch = useDispatch()

  const style = {
    display: 'flex',
    padding: 5,
    marginBottom: 7,
    gap: 7,
    backgroundColor: 'grey',
  }
  return (
    <div style={style}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {user.username} logged in
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  )
}

export default Nav

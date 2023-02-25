import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { logout } from '../reduces/userReduce'

const Navi = styled.nav`
  font-size: 1.2em;
  display: flex;
  gap: 7px;
  padding: 5px;
  border-radius: 5px;
  width: 65%;
  background-color: grey;
`

const Button = styled.button`
  background-color: lightblue;
  border-radius: 5px;
`
const Nav = () => {
  const { user } = useSelector((s) => s)
  const dispatch = useDispatch()

  return (
    <Navi>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {user.username} logged in
      <Button onClick={() => dispatch(logout())}>LOGOUT</Button>
    </Navi>
  )
}

export default Nav

import { useDispatch } from 'react-redux'

import { login } from '../reduces/userReduce'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = (evt) => {
    evt.preventDefault()
    dispatch(login(evt.target.username.value, evt.target.password.value))
    evt.target.username.value = ''
    evt.target.password.value = ''
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" name="username" />
      </div>
      <div>
        password
        <input type="text" name="password" />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm

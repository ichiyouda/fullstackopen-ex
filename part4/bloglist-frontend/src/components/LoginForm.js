import PropTypes from 'prop-types'
import { useState } from 'react'

const LoginForm = ({
  createLogin,
  notify
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (evt) => {
    evt.preventDefault()
    try {
      await createLogin(username, password)
      setUsername('')
      setPassword('')
    } catch (excep) {
      notify('red', 'wrong username or password', 5000)
      setUsername('')
      setPassword('')
      console.error(excep.name)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}


LoginForm.prototype = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}


export default LoginForm
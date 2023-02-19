import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogFrom'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { detectLoggined, logout } from './reduces/userReduce'

const App = () => {
  console.log('hello again, React')

  const { user } = useSelector((s) => s)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(detectLoggined())
  }, [])

  // 原本是要傳入<BlogForm />
  const blogFormRef = useRef()

  if (!user.username) {
    return (
      <>
        <h2>Login in to the application</h2>
        <Notification />
        <LoginForm />
      </>
    )
  } else {
    return (
      <>
        <h2>Blogs</h2>
        <Notification />
        <p>
          {user.username} logged in
          <button onClick={() => dispatch(logout())}>logout</button>
        </p>
        <Togglable
          openLabel="create new note"
          closeLabel="cancel"
          ref={blogFormRef}
        >
          <BlogForm />
        </Togglable>
        <BlogList user={user} />
      </>
    )
  }
}

export default App

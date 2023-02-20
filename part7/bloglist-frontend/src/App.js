import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import Nav from './views/Nav'
import Users from './views/Users'
import User from './views/User'
import Blogs from './views/Blogs'
import Blog from './views/Blog'

import { detectLoggined } from './reduces/userReduce'

const App = () => {
  const { user } = useSelector((s) => s)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(detectLoggined())
  }, [])

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
        <Nav />
        <Notification />
        <h2>blog app</h2>
        <Routes>
          <Route path="/" element={<Blogs />} />

          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </>
    )
  }
}

export default App

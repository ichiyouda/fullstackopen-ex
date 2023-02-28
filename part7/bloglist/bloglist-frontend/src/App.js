import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import Nav from './components/Nav'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogFrom'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import BlogList from './components/BlogList'

import { useDetectLoggined } from './hooks/index'

const App = () => {
  const { user } = useSelector((s) => s)
  const detectLoggined = useDetectLoggined()
  const blogFromRef = useRef()

  useEffect(detectLoggined, [])

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
        <Togglable
          openLabel="create new note"
          closeLabel="cancel"
          ref={blogFromRef}
        >
          <BlogForm hideMe={() => blogFromRef.current.toggleVisibility()} />
        </Togglable>

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </>
    )
  }
}

export default App

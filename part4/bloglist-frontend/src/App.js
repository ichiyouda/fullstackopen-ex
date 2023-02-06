import { useState, useEffect, useRef } from 'react'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogFrom'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

const App = () => {
  console.log('hello again, React')

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({})

  const [msg, setMsg] = useState('')
  const [color, setColor] = useState('')


  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [user])


  useEffect(() => {
    const useStr = window.localStorage.getItem('LoginedUser')
    if (useStr) {
      const user = JSON.parse(useStr)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const notify = (color, txt, times) => {
    setColor(color)
    setMsg(txt)
    setTimeout(() => {
      setMsg('')
    }, times)
  }


  const createLoginUser = async (username, password) => {
    const loginUser = await blogService.login({ username, password })
    window.localStorage.setItem('LoginedUser', JSON.stringify(loginUser))

    setUser(loginUser)
    blogService.setToken(loginUser.token)
  }


  const blogFormRef = useRef()

  const createBlog = async (title, author, url) => {
    const newBlog = { title, author, url }
    const savedBlog = await blogService.addBlog(newBlog)

    notify(
      'green',
      `a new blog ${savedBlog.title} by ${savedBlog.author}`,
      3000)

    setBlogs(blogs.concat(savedBlog))
    blogFormRef.current.toggleVisibility()
  }


  const Handlelogout = () => {
    setUser({})
    window.localStorage.clear()
  }


  const removeBlog = id => {
    setBlogs(blogs.filter(b => b.id !== id))
  }

  blogs.sort((a, b) => b.likes - a.likes)

  if (!user.username) {
    return (
      <>
        <h2>Login in to the application</h2>
        <Notification msg={msg} color={color} />
        <LoginForm
          createLogin={createLoginUser}
          notify={notify}
        />
      </>
    )
  } else {
    return (
      <>
        <h2>Blogs</h2>
        <Notification msg={msg} color={color} />
        <p>
          {user.username} logged in <button onClick={Handlelogout}>logout</button>
        </p>
        <Togglable
          openLabel='create new note'
          closeLabel='cancel'
          ref={blogFormRef}>
          <BlogForm
            createBlog={createBlog}
            notify={notify} />
        </Togglable>
        <ul id='blogs'>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              removeBlog={removeBlog} />)}
        </ul>
      </>
    )
  }
}

export default App
import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogFrom'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  console.log('hello again, React')

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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


  const handleLogin = async (evt) => {
    evt.preventDefault()
    try {
      const loginUser = await blogService.login({ username, password })
      window.localStorage.setItem('LoginedUser', JSON.stringify(loginUser))

      setUser(loginUser)
      blogService.setToken(loginUser.token)

      setUsername('')
      setPassword('')
    } catch (excep) {
      setColor('red')
      setMsg('wrong username or password')
      setTimeout(() => {
        setMsg('')
      }, 5000)

      setUsername('')
      setPassword('')

      console.error(excep.name)
    }
  }


  const LoginForm = () => (
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

  const blogFormRef = useRef()
  const handleNewBlog = async evt => {
    evt.preventDefault()
    try {

      const newBlog = { title, author, url }
      const savedBlog = await blogService.addBlog(newBlog)
      console.log(savedBlog)

      setColor('green')
      setMsg(`a new blog ${savedBlog.title} by ${savedBlog.author} added`)
      setTimeout(() => {
        setMsg('')
      }, 3000)
      setBlogs(blogs.concat(savedBlog))

      blogFormRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exp) {

      setColor('red')
      setMsg(`${exp}`)
      setTimeout(() => {
        setMsg('')
      }, 6000)

      console.error(exp.name)
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }


  const Handlelogout = () => {
    setUser({})
    window.localStorage.clear()
  }

  const removeBlog = id => {
    setBlogs(blogs.filter(b => b.id !== id))
  }


  blogs.sort((a, b) => b.likes - a.likes)
  // conditional render
  if (!user.username) {
    return (
      <>
        <h2>Login in to the application</h2>
        <Notification msg={msg} color={color} />
        {LoginForm()}
      </>
    )
  } else {
    return (
      <>
        <h2>Blogs</h2>
        <Notification msg={msg} color={color} />
        <p>{user.username} logged in
          <button onClick={Handlelogout}>logout</button>
        </p>
        <Togglable
          openLabel='create new note'
          closeLabel='cancel'
          ref={blogFormRef}>
          <BlogForm
            handleSubmit={handleNewBlog}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            title={title}
            author={author}
            url={url} />
        </Togglable>
        <ul>
          {
            blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                removeBlog={removeBlog}
              />)
          }
        </ul>
      </>
    )
  }
}

export default App
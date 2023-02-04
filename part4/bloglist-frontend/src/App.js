import { useState, useEffect } from 'react'
import Blog from './components/Blog'
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

  const inputForBlog = (val, setVal) => (
    <>
      <input
        type="text"
        value={val}
        name={val}
        onChange={({ target }) => setVal(target.value)}
      />
    </>
  )

  const handleCreateOne = async evt => {
    evt.preventDefault()
    try { 
      const newBlog = { title, author, url }
      const res = await blogService.addBlog(newBlog)      
      setBlogs(blogs.concat(res))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exp) {
      console.error(exp.name)
    }
  }

  const CreateOneForm = () => (
    <form onSubmit={handleCreateOne}>
      <div>
        <div>
          title:
          {inputForBlog(title, setTitle)}
        </div>
        <div>
          author:
          {inputForBlog(author, setAuthor)}
        </div>
        <div>
          url:
          {inputForBlog(url, setUrl)}
        </div>
      </div>
      <button type='submit'>create</button>
    </form>
  )

  const Handlelogout = () => {
    setUser({})
    window.localStorage.clear()
  }

  if (!user.username) {
    return (
      <>
        <h2>Login in to the application</h2>
        {LoginForm()}
      </>
    )
  } else {
    return (
      <>
        <h2>Blogs</h2>
        <p>{user.username} logged in 
          <button onClick={Handlelogout}>logout</button>
        </p>
        {CreateOneForm()}
        <ul>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />)}
        </ul>
      </>
    )
  }
}

export default App
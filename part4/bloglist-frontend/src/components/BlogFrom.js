import { useState } from 'react'
import PropTypes from 'prop-types'

const inputForBlog = (val, setVal) => (
  <input
    type="text"
    value={val}
    name={val}
    onChange={({ target }) => setVal(target.value)}
  />
)

const BlogForm = ({
  createBlog,
  notify
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      await createBlog(title, author, url)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exp) {
      notify('red', `${exp.name}`, 6000)
      // if jwt expired， auto jump to the login in from
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
}

export default BlogForm
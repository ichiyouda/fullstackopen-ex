import { useState } from 'react'
import PropTypes from 'prop-types'

const inputForBlog = (val, setVal, id) => (
  <input
    id={id}
    type="text"
    value={val}
    name={val}
    onChange={({ target }) => setVal(target.value)}
  />
)

const BlogForm = ({
  createBlog,
  notify,
  relogin
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
      notify('red', `${exp.message}`, 4000)
      setTitle('')
      setAuthor('')
      setUrl('')
      relogin(exp)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          title:
          {inputForBlog(title, setTitle, 'title')}
        </div>
        <div>
          author:
          {inputForBlog(author, setAuthor, 'author')}
        </div>
        <div>
          url:
          {inputForBlog(url, setUrl, 'url')}
        </div>
      </div>
      <button className='submit' type='submit'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
  relogin: PropTypes.func.isRequired
}

export default BlogForm
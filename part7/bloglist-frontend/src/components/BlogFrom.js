import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { createNew } from '../reduces/blogListReduce'
import { notify } from '../reduces/notifyReduce'

const inputForBlog = (val, setVal, id) => (
  <input
    id={id}
    type="text"
    value={val}
    name={val}
    onChange={({ target }) => setVal(target.value)}
  />
)

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    try {
      dispatch(createNew({ title, author, url }))
      dispatch(notify('green', `a new blog ${title} by ${author}`, 3000))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      dispatch(notify('red', `${exception.message}`, 4000))
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
      <button className="submit" type="submit">
        create
      </button>
    </form>
  )
}

export default BlogForm

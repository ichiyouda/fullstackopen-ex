import { useDispatch } from 'react-redux'

import { createNew } from '../reduces/blogListReduce'
import { notify } from '../reduces/notifyReduce'

const BlogForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    let title = evt.target.title.value
    let author = evt.target.author.value
    let url = evt.target.url.value
    dispatch(createNew({ title, author, url }))
    dispatch(notify('green', `a new blog ${title} by ${author}`, 3000))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          title:
          <input type="text" name="title" />
        </div>
        <div>
          author:
          <input type="text" name="author" />
        </div>
        <div>
          url:
          <input type="text" name="url" />
        </div>
      </div>
      <button className="submit" type="submit">
        create
      </button>
    </form>
  )
}

export default BlogForm

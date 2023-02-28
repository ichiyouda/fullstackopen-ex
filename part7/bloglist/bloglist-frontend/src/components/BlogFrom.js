import { useDispatch } from 'react-redux'

import { createNew } from '../reduces/blogListReduce'

const BlogForm = ({ hideMe }) => {
  const dispatch = useDispatch()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    let title = evt.target.title.value
    let author = evt.target.author.value
    let url = evt.target.url.value
    dispatch(createNew({ title, author, url }))
    evt.target.title.value = 0
    evt.target.author.value = 0
    evt.target.url.value = 0
    hideMe()
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

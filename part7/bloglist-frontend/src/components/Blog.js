import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleBlogLike, removeBy } from '../reduces/blogListReduce'

import throttle from '../utils/throttle'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBy(blog.id))
    }
    navigate('/')
  }

  const addlike = () => {
    dispatch(handleBlogLike(blog))
  }

  const removeStyle = {
    display: blog.user.username !== user.username ? 'none' : '',
    backgroundColor: 'lightblue',
    borderColor: 'lightblue',
    fontWeight: 'bold',
    borderRadius: 2,
  }

  if (!blog) {
    return null
  }
  return (
    <>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likers: {blog.likes}{' '}
        <button onClick={throttle(addlike, 500)} className="likeButton">
          like
        </button>
      </div>
      <div>added by {blog.author}</div>
      <div>
        <button style={removeStyle} onClick={deleteBlog}>
          remove
        </button>
      </div>
    </>
  )
}

export default Blog

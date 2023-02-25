import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleBlogLike, removeBy, addComment } from '../reduces/blogListReduce'

import throttle from '../utils/throttle'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBy(blog.id))
      console.log('2')
      navigate('/')
    } else {
      console.log('cancel remove')
    }
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

  const Comments = () => {
    if (blog.comments.length > 0) {
      return (
        <ul>
          {blog.comments.map((m) => (
            <li key={Math.random() * 1000}>{m}</li>
          ))}
        </ul>
      )
    } else {
      return <p>no comment</p>
    }
  }

  const handleAddComment = (evt) => {
    evt.preventDefault()
    dispatch(addComment(blog.id, evt.target.comment.value))
    evt.target.comment.value = ''
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
        <button style={removeStyle} onClick={removeBlog}>
          remove
        </button>
      </div>
      <div>
        <h3>Comments</h3>
        <form onSubmit={handleAddComment}>
          <input type="text" name="comment" />
          <button type="submit">add comment</button>
        </form>
        {Comments()}
      </div>
    </>
  )
}

export default Blog

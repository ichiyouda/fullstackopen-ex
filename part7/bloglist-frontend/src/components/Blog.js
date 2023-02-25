import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleBlogLike, removeBy, addComment } from '../reduces/blogListReduce'
import styled from 'styled-components'

import throttle from '../utils/throttle'

const Button = styled.button`
  display: ${(props) => (props.isUser ? '' : 'none')};
  font-weight: bold;
  margin-top: 0.5em;
  border: 2px solid lightblue;
  border-radius: 2px;
  background-color: lightblue;
`
const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBy(blog.id))
      navigate('/')
    } else {
      console.log('cancel remove')
    }
  }

  const addlike = () => {
    dispatch(handleBlogLike(blog))
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
        <Button
          isUser={blog.user.username === user.username}
          onClick={removeBlog}
        >
          remove
        </Button>
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

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleBlogLike, removeBy } from '../reduces/blogListReduce'

import throttle from '../utils/throttle'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: 'green',
  marginBottom: 5,
  maxWidth: '40%',
}

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { ...blogStyle, display: visible ? 'none' : '' }
  const showWhenVisible = { ...blogStyle, display: visible ? '' : 'none' }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBy(blog.id))
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
  return (
    <>
      <div style={hideWhenVisible} className="view">
        {blog.title} {blog.author}{' '}
        <button onClick={() => setVisible(!visible)} className="viewButton">
          view
        </button>
      </div>

      <div style={showWhenVisible} className="hide">
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(!visible)}>hide</button>
        </div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likers: {blog.likes}{' '}
          <button onClick={throttle(addlike, 500)} className="likeButton">
            like
          </button>
        </div>
        <div>{blog.author}</div>
        <div>
          <button style={removeStyle} onClick={deleteBlog}>
            remove
          </button>
        </div>
      </div>
    </>
  )
}

export default Blog

import { useState } from 'react'
import throttle from '../utils/throttle'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: 'green',
  marginBottom: 5,
  maxWidth: '40%'
}


const Blog = ({ blog, user, handlelike, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { ...blogStyle, display: visible ? 'none' : '' }
  const showWhenVisible = { ...blogStyle, display: visible ? '' : 'none' }

  const addLike = async () => {
    const savedBlog = await handlelike(blog, likes)
    setLikes(savedBlog.likes)
  }



  const removeStyle = {
    display: blog.user.username !== user.username ? 'none' : '',
    backgroundColor: 'lightblue',
    borderColor: 'lightblue',
    fontWeight: 'bold',
    borderRadius: 2
  }


  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await removeBlog(blog)
    }
  }


  return (
    <>
      <div style={hideWhenVisible}>
        {blog.title}  <button onClick={() => setVisible(!visible)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} <button onClick={() => setVisible(!visible)}>hide</button>
        </div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likers: {likes} <button onClick={throttle(addLike, 800)}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div>
          <button
            style={removeStyle}
            onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </>
  )
}

export default Blog
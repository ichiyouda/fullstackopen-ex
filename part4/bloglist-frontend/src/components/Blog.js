import { useState } from "react"
import blogService from "../services/blogs"


const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: 'green',
  marginBottom: 5
}


const Blog = ({ blog, user, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { ...blogStyle, display: visible ? 'none' : '' }
  const showWhenVisible = { ...blogStyle, display: visible ? '' : 'none' }

  const addLike = async () => {
    try {
      const { id, title, author, url, user } = blog
      const savedBlog = await blogService.updateBlog(id, {
        title,
        author,
        url,
        likes: likes + 1,
        user: user.id
      })
      setLikes(savedBlog.likes)
    } catch (exp) {
      console.error(exp)
    }
  }

  const removeStyle = {
    display: blog.user.username !== user.username ? 'none' : '',
    backgroundColor: 'lightblue',
    borderColor: 'lightblue',
    fontWeight: 'bold',
    borderRadius: 2
  }


  const deleteBlog = async () => {
    try {      
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.deleteBlog(blog.id)
        removeBlog(blog.id)
      }
    } catch (err) {
      console.error(err)
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
          likers: {likes} <button onClick={addLike}>like</button>
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
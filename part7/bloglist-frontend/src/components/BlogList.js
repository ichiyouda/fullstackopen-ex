import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { initBlogList } from '../reduces/blogListReduce'

const blogStyle = {
  padding: 10,
  marginBottom: 8,
  border: 'solid',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: 'green',
  maxWidth: '60%',
}

const BlogList = () => {
  const { blogs } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogList())
  }, [])

  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default BlogList

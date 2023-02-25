import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { initBlogList } from '../reduces/blogListReduce'

const Li = styled.li`
  padding: 10px;
  margin-bottom: 8px;
  border: 2px solid green;
  border-radius: 2px;
  max-width: 60%;
`

const BlogList = () => {
  const { blogs } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogList())
  }, [])

  return (
    <ul>
      {blogs.map((blog) => (
        <Li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </Li>
      ))}
    </ul>
  )
}

export default BlogList

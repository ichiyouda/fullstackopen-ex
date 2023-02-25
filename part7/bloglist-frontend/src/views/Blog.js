import { useSelector, useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'

import Blog from '../components/Blog'
import { initBlogList } from '../reduces/blogListReduce'

const BlogView = () => {
  const { user, blogs } = useSelector((s) => s)
  const dispatch = useDispatch()
  const match = useMatch('/blogs/:id')

  const theBlog = match ? blogs.find((b) => b.id === match.params.id) : null
  if (!theBlog) {
    dispatch(initBlogList())
    return null
  } else {
    return <Blog blog={theBlog} user={user} />
  }
}

export default BlogView

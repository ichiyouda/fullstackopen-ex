import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import Blog from './Blog'
import { initBlogList } from '../reduces/blogListReduce'

const BlogList = () => {
  const { blogs, user } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogList())
  }, [])

  return (
    <>
      <ul id="blogs">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </ul>
    </>
  )
}

export default BlogList

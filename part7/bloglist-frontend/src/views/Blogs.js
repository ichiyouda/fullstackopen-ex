import { useSelector } from 'react-redux'

import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogFrom'
import BlogList from '../components/BlogList'

const Blogs = () => {
  const { user } = useSelector((s) => s)
  return (
    <>
      <Togglable openLabel="create new note" closeLabel="cancel">
        <BlogForm />
      </Togglable>
      <BlogList user={user} />
    </>
  )
}

export default Blogs

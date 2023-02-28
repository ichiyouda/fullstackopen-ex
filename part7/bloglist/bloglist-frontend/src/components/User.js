import { useMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAll } from '../reduces/usersReduce'

const User = () => {
  const { users } = useSelector((s) => s)
  const dispatch = useDispatch()
  const match = useMatch('/users/:id')

  const user = match ? users.find((u) => u.id === match.params.id) : null
  if (!user) {
    console.error('nonfound user')
    dispatch(getAll())
    return null
  }
  return (
    <>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={Math.random() * 1000}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User

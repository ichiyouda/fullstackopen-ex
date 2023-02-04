import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = (t) => {
  token = `Bearer ${t}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const login = async credentials => {
  const response = await axios.post('/api/login', credentials)
  return response.data
}


const addBlog = async newObj => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(
    '/api/blogs',
    newObj,
    config)
    
  return res.data

}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, login, setToken, addBlog }
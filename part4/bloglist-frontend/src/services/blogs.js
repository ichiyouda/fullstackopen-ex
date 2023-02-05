import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

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
    baseUrl,
    newObj,
    config)

  return res.data

}


const updateBlog = async (id, newObj) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObj)
  return res.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  login,
  setToken,
  addBlog,
  updateBlog,
  deleteBlog
}
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

const login = async (credentials) => {
  const response = await axios.post('/api/login', credentials)
  return response.data
}

const add = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newBlog, config)

  return res.data
}

const update = async (id, newBlog) => {
  const res = await axios.put(`${baseUrl}/${id}`, newBlog)
  return res.data
}

const deleteBy = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default {
  getAll,
  login,
  setToken,
  add,
  update,
  deleteBy,
}

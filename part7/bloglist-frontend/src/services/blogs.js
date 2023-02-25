import axios from 'axios'
import { baseUrl, token, setToken } from '../utils/config'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getAllUser = async () => {
  const request = await axios.get('/api/users')
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

/**
 *
 * @param {String} id
 * @param {String} content
 * @returns Array
 */
const addCommentWithBlog = async (id, content) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, { content })
  return res.data
}

export default {
  getAll,
  login,
  setToken,
  add,
  update,
  deleteBy,
  getAllUser,
  addCommentWithBlog,
}

import axios from 'axios'
export const baseUrl = '/api/blogs'
import userService from '../services/user'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const add = async (newBlog) => {
  const config = {
    headers: { Authorization: userService.getToken() },
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
    headers: { Authorization: userService.getToken() },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

/**
 *
 * @param {String} id
 * @param {String} content
 * @returns Array
 */
const addComment = async (id, content) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, { content })
  return res.data
}

export default {
  getAll,
  add,
  update,
  deleteBy,
  addComment,
}

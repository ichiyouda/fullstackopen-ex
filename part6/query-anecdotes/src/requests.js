import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const create = async (newAnec) => {
  const res = await axios.post(baseUrl, newAnec)
  return res.data
}

export const update = async (newAnec) => {
  const res = await axios.put(`${baseUrl}/${newAnec.id}`, newAnec)
  return res.data
}

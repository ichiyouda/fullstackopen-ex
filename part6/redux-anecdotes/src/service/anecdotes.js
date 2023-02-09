import axios from "axios"
const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseURL)
  return res.data
}


const addAnec = async newObj => {
  const res = await axios.post(baseURL, newObj)
  return res.data
}


const updateVote = async newObj => {
  const res = await axios.put(`${baseURL}/${newObj.id}`, newObj)
  return res.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addAnec, updateVote }
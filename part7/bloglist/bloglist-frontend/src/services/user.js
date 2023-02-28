let token = null

const getToken = () => {
  return token
}

const setToken = (t) => {
  token = `Bearer ${t}`
}

export default { getToken, setToken }

export const baseUrl = '/api/blogs'

export let token = null

export const setToken = (t) => {
  token = `Bearer ${t}`
}

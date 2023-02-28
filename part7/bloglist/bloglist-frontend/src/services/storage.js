const key = 'loginItem'

const getItem = () => {
  return window.localStorage.getItem(key)
}

const setItem = (value) => {
  window.localStorage.setItem(key, value)
}

const clear = () => {
  window.localStorage.clear()
}

export default { getItem, setItem, clear }

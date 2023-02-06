let prev = 0
const throttle = (func, delay) => {

  return (...args) => {
    let now = new Date().getTime()
    console.log(now - prev, delay)

    if (now - prev > delay) {
      prev = now
      return func(...args)
    } else {
      console.log('func is delayed')
    }
  }
}

export default throttle
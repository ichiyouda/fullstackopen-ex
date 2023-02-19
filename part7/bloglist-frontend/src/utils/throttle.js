let prev = 0
const throttle = (func, delay) => {

  return (...args) => {
    let now = new Date().getTime()
    if (now - prev > delay) {
      prev = now
      return func(...args)
    } else {
      console.log(`${now - prev} < ${delay}`)
      console.log('func is delayed')
    }
  }
}


export default throttle
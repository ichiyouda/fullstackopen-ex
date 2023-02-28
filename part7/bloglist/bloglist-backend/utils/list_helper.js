const _ = require('lodash')


// eslint-disable-next-line no-unused-vars
const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}


const favoriteBlog = blogs => {
  blogs.sort((a, b) => b.likes - a.likes)
  return blogs[0]
}


const mostBlogs = blogs => {
  const Authors = _.transform(_.countBy(blogs, blog => blog.author), (acc, val, key) => {
    acc.push({
      author: key,
      blogs: val
    })
  }, [])
  return _.maxBy(Authors, a => a.blogs)
}


const mostLikes = blogs => {
  const Authors = _.transform(_.groupBy(blogs, b => b.author), (acc, val, key) => {
    acc.push({
      author: key,
      likes: val.reduce((acc, v) => acc + v.likes, 0)
    })
  }, [])
  return _.maxBy(Authors, a => a.likes)
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
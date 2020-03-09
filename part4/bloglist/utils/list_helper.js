// const lodash = require('lodash')

const totalLikes = (blogs) => {
  let sum = 0
  if (blogs.length === 0){
    return sum
  } else {
    return blogs.reduce((prev, cur) => prev + cur.likes, 0)
  }
}
const favoriteBlog = (blogs) => {
  let biggestBlog = blogs[0]
  for (let i in blogs){
    if (blogs[i].likes > biggestBlog.likes){
      biggestBlog = blogs[i]
    }
  }
  return biggestBlog
}
const mostBlogs = (blogs) => {
  let mostBlogs = blogs[0]
  // let map = new Map()

  // blogs.forEach(blog => {
  //   console.log(blog)
  //   if (!map.has(blog.author)){
  //     map.set(blog, 0)
  //   } else {
  //     map.set(blog, (map.get(blog) + 1))
  //   }
  // })
  return mostBlogs
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
}
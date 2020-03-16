/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
const _ = require('lodash')

const totalLikes = (blogs) => {
  const sum = 0
  if (blogs.length === 0) {
    return sum
  }
  return blogs.reduce((prev, cur) => prev + cur.likes, 0)
}
const favoriteBlog = (blogs) => {
  let biggestBlog = blogs[0]

  for (const i in blogs) {
    if (blogs[i].likes > biggestBlog.likes) {
      biggestBlog = blogs[i]
    }
  }
  return biggestBlog
}
const mostBlogs = (blogs) => {
  const authorWithMostBlogs = blogs[0]


  return authorWithMostBlogs
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
}

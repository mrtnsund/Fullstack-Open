// const lodash = require('lodash')

const totalLikes = (blogs) => {
  const sum = 0
  if (blogs.length === 0) {
    return sum
  }
  return blogs.reduce((prev, cur) => prev + cur.likes, 0)
}
const favoriteBlog = (blogs) => {
  let biggestBlog = blogs[0]

  // eslint-disable-next-line no-restricted-syntax
  for (const i in blogs) {
    if (blogs[i].likes > biggestBlog.likes) {
      biggestBlog = blogs[i]
    }
  }
  return biggestBlog
}
const mostBlogs = (blogs) => {
  const authorWithMostBlogs = blogs[0]

  // todo
  // let map = new Map()

  // blogs.forEach(blog => {
  //   console.log(blog)
  //   if (!map.has(blog.author)){
  //     map.set(blog, 0)
  //   } else {
  //     map.set(blog, (map.get(blog) + 1))
  //   }
  // })
  return authorWithMostBlogs
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
}

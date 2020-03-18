/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */

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
  const authorList = []
  const authors = (blog) => {
    const index = authorList.findIndex((blogsInList) => blogsInList.author === blog.author)
    if (index === -1) {
      authorList.push(
        {
          author: blog.author,
          count: 1,
        },
      )
    } else {
      authorList[index].count += 1
    }
  }
  blogs.forEach((blog) => authors(blog))

  const noOfMostBlogs = (Math.max(...authorList.map((o) => o.count), 0))
  const indexForMostBlogs = authorList.findIndex((blog) => blog.count === noOfMostBlogs)

  return authorList[indexForMostBlogs]
}

const mostLikes = (blogs) => {
  const authorList = []
  const authors = (blog) => {
    const index = authorList.findIndex((blogsInList) => blogsInList.author === blog.author)
    if (index === -1) {
      authorList.push(
        {
          author: blog.author,
          likes: blog.likes,
        },
      )
    } else {
      authorList[index].likes += blog.likes
    }
  }
  blogs.forEach((blog) => authors(blog))

  const noOfMostLikes = (Math.max(...authorList.map((o) => o.likes), 0))
  const indexForMostLikes = authorList.findIndex((blog) => blog.likes === noOfMostLikes)

  console.log('number of most likes', noOfMostLikes)
  console.log('index of most likes', indexForMostLikes)
  return authorList[indexForMostLikes]
}
module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

const listHelper = require('../utils/list_helper')

const listWithMoreBlogs = [
  {
    title: "Morten",
    author: "Mikel",
    url: "mrtnsund.dev",
    likes: 5
  },
  {
    title: "Morten",
    author: "Morten",
    url: "mrtnsund.dev",
    likes: 5
  },
  {
    title: "Morten",
    author: "Morten",
    url: "mrtnsund.dev",
    likes: 5
  },
  {
    title: "Morten med mest likes",
    author: "Morten",
    url: "mrtnsund.dev",
    likes: 8
  }
]
const emptyList = []
const listWithOneBlog = [
  {
    title: "Morten",
    author: "Morten",
    url: "mrtnsund.dev",
    likes: 5
  }
]

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMoreBlogs)
    expect(result).toBe(23)
  })
})
describe('most votes', () => {

  test('most votes is favorited', () => {
    const result = listHelper.favoriteBlog(listWithMoreBlogs)
    expect(result.title).toBe('Morten med mest likes')
  })

})
// describe('most blogs', () => {
//   test('most blogs has most blogs', () => {
//     const result = listHelper.mostBlogs(listWithMoreBlogs)
//     expect(result.author).toBe('Morten')
//   })
// })
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Mortens testblogg',
    author: 'Morten Sund',
    url: 'www.example.com',
    likes: 10,
  },
  {
    title: 'Per Viskelers testblogg',
    author: 'Per Viskeler',
    url: 'www.per-v.com',
    likes: 0,
  },
  {
    title: 'Bloggen om livet',
    author: 'Atle Patle',
    url: 'www.livet.no',
    likes: 0,
  },
]

const dummy = (blogs) => 1


const nonExistingId = async () => {
  const blog = new Blog({})
  await blog.save()
  await blog.remove()

  // eslint-disable-next-line no-underscore-dangle
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, dummy,
}

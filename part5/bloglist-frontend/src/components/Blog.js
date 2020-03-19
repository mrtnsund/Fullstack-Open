import React from 'react'
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const expand = () => {

  }
  return (
  <div style={blogStyle}>
    {blog.title} by {blog.author}
    <button>view</button>
  </div>
  )
}

export default Blog

import React, { useState } from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };
  const showDelete = { display: blog.user.username === user.username ? '': 'none' };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  const expandBlog = () => {
    setVisible(!visible);
  };

  const addLike = (blog) => {
    blogService.addLike(blog);
    setLikes(blog.likes);
  };
  const removeBlog = (blog) => {
    if (window.confirm(`Do you really want to delete ${blog.title}?`)){
      blogService.deleteBlog(blog.id);
    }
  };
  return (
    <div>
      <div style={{ ...blogStyle, ...hideWhenVisible }}>
        {blog.title} by {blog.author}
        <button onClick={expandBlog}>view</button>
      </div>
      <div style={{ ...blogStyle, ...showWhenVisible }} className="togglableContent">
        {blog.title} by {blog.author}
        <button onClick={expandBlog}>hide</button><br />
        {blog.url}<br />
        {likes} likes<button onClick={() => addLike(blog)}>like</button><br />
        {blog.user.username}<br />
        <button style={showDelete} onClick={() => removeBlog(blog)}>remove</button>
      </div>
    </div>
  );
};

export default Blog;


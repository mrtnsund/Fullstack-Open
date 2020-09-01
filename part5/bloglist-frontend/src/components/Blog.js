import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, user, handleBlogLike, handleBlogRemove }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const showWhenVisibleStyle = { display: visible ? "none" : "" };

  const showDelete = {
    display: blog.user.username === user.username ? "" : "none",
  };

  const expandBlog = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={expandBlog}>view</button>
      </div>
      <div
        style={showWhenVisibleStyle}
        className="togglableContent"
      >
        {blog.title} by {blog.author}
        <button onClick={expandBlog}>hide</button>
        <br />
        {blog.url}
        <br />
        {blog.likes} likes<button onClick={ handleBlogLike }>like</button>
        <br />
        {blog.user.username}
        <br />
        <button style={showDelete} onClick={ handleBlogRemove }>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleBlogLike: PropTypes.func.isRequired,
  handleBlogRemove: PropTypes.func.isRequired,
};

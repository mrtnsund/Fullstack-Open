import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, user, handleBlogLike, handleBlogRemove }) => {
  const [visible, setVisible] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const showWhenVisibleStyle = { display: visible ? "" : "none" };
  const hideWhenVisibleStyle = { display: visible ? "none" : "" };

  const showDelete = {
    display: blog.user.username === user.username ? "" : "none",
  };

  const expandBlog = () => {
    setVisible(!visible);
  };

  const handleBlogLikeWrapper = (e) => {
    handleBlogLike(e);
    setCurrentLikes(blog.likes);
  }

  return (
    <div>
      <div style={{...blogStyle, ...hideWhenVisibleStyle}}>
        {blog.title} by {blog.author}
        <button onClick={expandBlog}>
          view
        </button>
      </div>
      <div style={{...blogStyle, ...showWhenVisibleStyle}} className="togglableContent">
        {blog.title} by {blog.author}
        <button onClick={expandBlog}>hide</button>
        <br />
        {blog.url}
        <br />
        {currentLikes} likes<button value={blog.id} onClick={(e) => handleBlogLikeWrapper(e)}>like</button>
        <br />
        {blog.user.username}
        <br />
        <button style={showDelete} value={blog.id} onClick={handleBlogRemove}>
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

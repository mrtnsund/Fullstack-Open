import React, { useState } from "react";
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const expandBlog = () => {
    setVisible(!visible);
  };

  const addLike = (blog) => {
    blogService.addLike(blog);
    setLikes(blog.likes);
  }
  return (
    <div>
      <div style={{ ...blogStyle, ...hideWhenVisible }}>
        {blog.title} by {blog.author}
        <button onClick={expandBlog}>view</button>
      </div>
      <div style={{ ...blogStyle, ...showWhenVisible }}>
        {blog.title} by {blog.author}
        <button onClick={expandBlog}>hide</button><br />
        {blog.url}<br />
        {likes} likes<button onClick={() => addLike(blog)}>like</button><br />
        {blog.user.username}
      </div>
    </div>
  );
};

export default Blog;

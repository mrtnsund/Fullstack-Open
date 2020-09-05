import React from 'react';
import Blog from './Blog';
import PropTypes from 'prop-types';

const Blogs = ({ blogs, user, handleBlogLike, handleBlogRemove }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} handleBlogLike={handleBlogLike} handleBlogRemove={handleBlogRemove} />
      ))}
    </>
  );
};
Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blogs;

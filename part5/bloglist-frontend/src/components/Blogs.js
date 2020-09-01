import React from 'react';
import Blog from './Blog';
import PropTypes from 'prop-types';

const Blogs = ({ blogs, user }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </>
  );
};
Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blogs;

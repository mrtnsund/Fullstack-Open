import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleChangeT = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeA = (event) => {
    setAuthor(event.target.value);
  };
  const handleChangeU = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleChangeT}
            placeholder="Enter title..."
          />
        </div>
        <div>
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleChangeA}
            placeholder="Enter author..."
          />
        </div>
        <div>
          <input
            type="text"
            value={url}
            name="Url"
            onChange={handleChangeU}
            placeholder="Enter url..."
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
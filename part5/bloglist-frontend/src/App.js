import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import Toggleable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import LoginInfo from "./components/LoginInfo";
import Header from "./components/Header";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = React.createRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject);
      setBlogs(blogs.concat(blog));
      setNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} was added`
      );
      setNotificationType("success");
      setTimeout(() => {
        setNotification(null);
        setNotificationType(null);
      }, 5000);
    } catch (e) {
      setNotification("something went wrong");
      setNotificationType("error");
      setTimeout(() => {
        setNotification(null);
        setNotificationType(null);
      }, 5000);
    }
  };
  const handleBlogLike = async (e) => {
    const blogId = e.target.value
    console.log(blogId)
    const blog = blogs.find((b) => b.id === blogId);
    try {
      await blogService.addLike(blog);
    } catch (error) {
      setNotification("something went wrong");
      setNotificationType("error");
      setTimeout(() => {
        setNotification(null);
        setNotificationType(null);
      }, 5000);
    }
  };

  const handleBlogRemove = async (e) => {
    const blogId = e.target.value;
    const blog = blogs.find((b) => b.id === blogId);
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      try {
        await blogService.deleteBlog(blog.id);
        setNotification(`Deleted ${blog.title}`);
        setNotificationType("success");
      } catch (error) {
        setNotification("something went wrong");
        setNotificationType("error");
        setTimeout(() => {
          setNotification(null);
          setNotificationType(null);
        }, 5000);
      }
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      setNotification("wrong username or password");
      setNotificationType("error");
      setTimeout(() => {
        setNotification(null);
        setNotificationType(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.clear();
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      {user === null ? (
        <div>
          <Header text="log in to application"></Header>
          <Notification message={notification} type={notificationType} />
          <LoginForm
            handleLogin={handleLogin}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            username={username}
            password={password}
          ></LoginForm>
        </div>
      ) : (
        <div>
          <Header text="blogs"></Header>
          <Notification message={notification} type={notificationType} />
          <LoginInfo username={user.username} logout={handleLogout}></LoginInfo>
          <Header text="create new"></Header>
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Toggleable>
          <Blogs
            blogs={blogs}
            user={user}
            handleBlogLike={handleBlogLike}
            handleBlogRemove={handleBlogRemove}
          ></Blogs>
        </div>
      )}
    </div>
  );
};

export default App;

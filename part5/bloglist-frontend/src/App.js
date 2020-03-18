import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e){
      setNotification('wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
  }
  const addBlog = async (event) => {
    try {
      event.preventDefault()
      const blogObject = {
        title: title,
        author: author,
        url: url,
      }
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification(`a new blog ${blogObject.title} by ${blogObject.author} was added`)
      setNotificationType('success')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    } catch (e) {
      setNotification(`something went wrong`)
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    }
  } 

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        placeholder="Enter username..."
        />
      </div>
      <div>
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        placeholder="Enter password..."
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <input
        type="text"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
        placeholder="Enter title..."
        />
      </div>
      <div>
        <input
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
        placeholder="Enter author..."
        />
      </div>
      <div>
        <input
        type="text"
        value={url}
        name="Url"
        onChange={({ target }) => setUrl(target.value)}
        placeholder="Enter url..."
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
  return (
    <div>
      {user === null 
        ?
        <div>
          <h2>log in to application</h2>
          <Notification message={notification} type={notificationType} />
          {loginForm()}
        </div> 
        :
        <div>
          <h2>blogs</h2>
          <Notification message={notification} type={notificationType} />
          <p>logged in as {user.username} <button onClick={handleLogout}>logout</button> </p>
          <h2>create new</h2>
          {blogForm()}
          {blogs.map(blog =><Blog key={blog.id} blog={blog} />)}
        </div>
      }




    </div>
  )
}

export default App
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }

  if (error) {
    return <div className="error">{message}</div>;
  } else {
    return <div className="success">{message}</div>;
  }
};

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationStatus, setnotificationStatus] = useState(true);

  const loginForm = () => {
    return (
      <div>
        <h2>login</h2>
        <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} user={user} setUser={setUser} />
      </div>
    )
  }

  const blogsList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )
        }
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong credentials')
      setnotificationStatus(true);
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <div>
      <Notification
        message={notificationMessage}
        error={notificationStatus}
      />

      {user === null && loginForm()}
      {user !== null && blogsList()}

    </div>
  )
}

export default App
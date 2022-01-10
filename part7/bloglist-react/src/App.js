import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { getBlogs } from './reducers/blogReducer'
import Notification from './components/Notification'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //Redux Variables
  const dispatch = useDispatch()

  const loginForm = () => {
    return (
      <div>
        <h2>login</h2>
        <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} user={user} setUser={setUser} />
      </div>
    )
  }

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('user')
  }

  const blogsList = () => {
    return (
      <div>
        <h2>blogs</h2>

        <p>{user.name} logged in <button onClick={logOut}>log out</button></p>

        <Togglable buttonLabel='create new blog'>
          <NewBlogForm blogs={blogs}/>
        </Togglable>
        <div id='blogs'>
          {
            blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )
          }
        </div>
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userServer = await loginService.login({
        username, password,
      })
      setUser(userServer)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('user', JSON.stringify(userServer))
    } catch (exception) {
      const notificationMessage = {
        message: 'Wrong Credentials',
        status: true
      }
      dispatch(setNotification(notificationMessage, 5))
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const userParsed = JSON.parse(loggedUserJSON)
      setUser(userParsed)
      console.log(user)
      blogService.setToken(userParsed.token)
    }
  }, [])

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  return (
    <div>
      <Notification/>

      {user === null && loginForm()}
      {user !== null && blogsList()}

    </div>
  )
}

export default App
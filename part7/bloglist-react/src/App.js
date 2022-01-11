import React, { useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from './reducers/blogReducer'
import Notification from './components/Notification'
import { clearUser, loadUser } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  //Redux Variables
  const dispatch = useDispatch()

  const loginForm = () => {
    return (
      <div>
        <h2>login</h2>
        <LoginForm />
      </div>
    )
  }

  const logOut = () => {
    dispatch(clearUser())
  }

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

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

  return (
    <div>
      <Notification/>

      {user === null && loginForm()}
      {user !== null && blogsList()}

    </div>
  )
}

export default App
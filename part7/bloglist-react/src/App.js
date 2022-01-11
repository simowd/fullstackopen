import React, { useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from './reducers/blogReducer'
import Notification from './components/Notification'
import { clearUser, loadUser } from './reducers/userReducer'
import { Switch, Route } from 'react-router'
import Users from './components/Users'

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

  const logOutRender = () => {
    return (
      <>
        <p>{user.name} logged in <button onClick={logOut}>log out</button></p>
      </>
    )
  }

  const blogsList = () => {
    return (
      <div>
        <Togglable buttonLabel='create new blog'>
          <NewBlogForm blogs={blogs} />
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

  const logOut = () => {
    dispatch(clearUser())
  }

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  return (
    <div>
      <Notification />
      {user === null && loginForm()}
      <h2>blogs</h2>
      {user !== null && logOutRender()}
      <Switch>
        <Route path='/users'>
          {user !== null && <Users />}
        </Route>
        <Route path='/'>
          {user !== null && blogsList()}
        </Route>
      </Switch>

    </div>
  )
}

export default App
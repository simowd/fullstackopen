import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from './reducers/blogReducer'
import Notification from './components/Notification'
import { loadUser } from './reducers/userReducer'
import { Switch, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Navbar from './components/Navbar'

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

  const blogsList = () => {
    const containerStyle = {
      border: '1px',
      boderColor: 'black',
      borderStyle: 'solid',
      padding: '0.5rem',
      margin: '0.5rem',
    }

    return (
      <div>
        <h2>blogs</h2>
        <Togglable buttonLabel='create new blog'>
          <NewBlogForm blogs={blogs} />
        </Togglable>
        <div id='blogs'>
          {
            blogs.map(blog =>
              <div key={blog.id} style={containerStyle}> <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author} </Link> </div>
            )
          }
        </div>
      </div>
    )
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
      {user !== null && <Navbar user={user}/>}
      <Switch>
        <Route path='/blogs/:id'>
          {user !== null && <Blog />}
        </Route>
        <Route path='/users/:id'>
          {user !== null && <User />}
        </Route>
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
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
import { Container, Badge } from 'react-bootstrap'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  //Redux Variables
  const dispatch = useDispatch()

  const loginForm = () => {
    return (
      <Container>
        <h2><Badge bg='primary'>LOGIN</Badge></h2>
        <LoginForm />
      </Container>
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
      <Container>
        <h2>Blogs</h2>
        <Togglable buttonLabel='create new blog'>
          <NewBlogForm blogs={blogs} />
        </Togglable>
        <Container id='blogs'>
          {
            blogs.map(blog =>
              <Container key={blog.id} style={containerStyle}> <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author} </Link> </Container>
            )
          }
        </Container>
      </Container>
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
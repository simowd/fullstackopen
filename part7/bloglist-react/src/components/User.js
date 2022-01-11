import React from 'react'
import { getUsers } from '../reducers/usersReducer'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const User = () => {
  const params = useParams()
  const user = useSelector(state => state.users.find(u => u.id === params.id))
  const dispatch = useDispatch()
  if (!user) {
    dispatch(getUsers())
  }

  if (!user) {
    return null
  }

  return (
    <div key={user.id}>
      <h3>{user.name}</h3>
      <br />
      <h4>Added blogs</h4>
      <br />
      <ListGroup key={user.id}>
        {user.blogs.map((blog) =>
          <><ListGroupItem key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></ListGroupItem></>
        )}
      </ListGroup>
    </div>
  )
}

export default User
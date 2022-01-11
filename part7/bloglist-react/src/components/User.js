import React from 'react'
import { getUsers } from '../reducers/usersReducer'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

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
      <h4>added blogs</h4>
      <ul key={user.id}>
        {user.blogs.map((blog) =>
          <><li key={blog.id}>{blog.title}</li></>
        )}
      </ul>
    </div>
  )
}

export default User
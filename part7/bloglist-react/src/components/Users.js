import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const UserRow = ({ name, length, id }) => {
    return (
      <tr><td> <Link to={`/users/${id}`}>{name}</Link></td><td>{length}</td></tr>
    )
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th>name</th>
          <th><h4>blogs created</h4></th>
        </tr>
        {users.map(user => <UserRow key={user.id} name={user.name} length={user.blogs.length} id={user.id}/>)}
      </table>
    </div>
  )
}

export default Users
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'

const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const UserRow = ({ name, length }) => {
    return (
      <tr><td>{name}</td><td>{length}</td></tr>
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
        {users.map(user => <UserRow key={name.id} name={user.name} length={user.blogs.length} />)}
      </table>
    </div>
  )
}

export default Users
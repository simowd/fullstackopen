import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

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
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <UserRow key={user.id} name={user.name} length={user.blogs.length} id={user.id} />)}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
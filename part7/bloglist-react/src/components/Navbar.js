import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearUser } from '../reducers/userReducer'
import { Nav, NavItem, NavLink, Button } from 'react-bootstrap'

const Navbar = ({ user }) => {
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(clearUser())
  }

  const Navstyle = {
    background: 'white',
    margin: '5px',
    padding: '10px'
  }

  const Spacing = {
    margin: '5px 10px'
  }

  return (
    <Nav style={Navstyle}>
      <NavItem>
        <NavLink as={Link} to='/'>Blogs</NavLink>
      </NavItem>
      <NavItem>
        <NavLink as={Link} to='/users'>Users</NavLink>
      </NavItem>
      <NavItem>
        <span style={Spacing}>{user.name} logged in <Button onClick={logOut}>log out</Button></span>
      </NavItem>
    </Nav>
  )
}

export default Navbar
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearUser } from '../reducers/userReducer'

const Navbar = ({ user }) => {
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(clearUser())
  }

  const Navstyle = {
    background: 'grey',
    margin: '5px',
    padding: '10px'
  }

  const Spacing = {
    margin: '5px 10px'
  }

  return (
    <div style={Navstyle}>
      <Link to='/'><span style={Spacing}>blogs</span></Link>
      <Link to='/users'><span style={Spacing}>users</span></Link>
      <span style={Spacing}>{user.name} logged in <button onClick={logOut}>log out</button></span>
    </div>
  )
}

export default Navbar
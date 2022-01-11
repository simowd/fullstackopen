import React, { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //Redux Variables
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(setUser(username, password))
      setUsername('')
      setPassword('')
    } catch (exception) {
      const notificationMessage = {
        message: 'Wrong Credentials',
        status: true
      }
      dispatch(setNotification(notificationMessage, 5))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
                username
        <input
          type="text"
          value={username}
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
                password
        <input
          type="password"
          value={password}
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id='login-button'>login</button>
    </form>
  )
}

export default LoginForm
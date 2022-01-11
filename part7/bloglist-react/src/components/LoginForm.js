import React, { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap'

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
    <Form onSubmit={handleLogin}>
      <FormGroup>
        <FormLabel>
          Username
        </FormLabel>
        <FormControl
          type="text"
          value={username}
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>
          Password
        </FormLabel>
        <FormControl
          type="password"
          value={password}
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </FormGroup>
      <Button variant="primary" type="submit" id='login-button'>
        Submit
      </Button>
    </Form>
  )
}

export default LoginForm
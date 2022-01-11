import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <Container>
      <Container style={hideWhenVisible}>
        <Button id='show' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </Container>
      <Container style={showWhenVisible}>
        {props.children}
        <Button id='cancel' onClick={toggleVisibility}>Cancel</Button>
      </Container>
    </Container>
  )
}

export default Togglable
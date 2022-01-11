import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const renderNotification = () => {
    if (notification.status) {
      return <Alert variant="danger">{notification.message}</Alert>
    } else {
      return <Alert variant="success">{notification.message}</Alert>
    }
  }

  return(
    <div>
      {notification.message !== null ? renderNotification() : null}
    </div>
  )
}

export default Notification


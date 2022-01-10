import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const renderNotification = () => {
    if (notification.status) {
      return <div className="error">{notification.message}</div>
    } else {
      return <div className="success">{notification.message}</div>
    }
  }

  return(
    <div>
      {notification.message !== null ? renderNotification() : null}
    </div>
    
  )
}

export default Notification


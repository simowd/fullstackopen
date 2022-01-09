import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notificationRender = () => {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }

  return (
    <div>
      {notification !== '' ? notificationRender() : null}
    </div>
  )
}

export default Notification
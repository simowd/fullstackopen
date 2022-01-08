import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { emptyNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notificationRender = () => {
    setTimeout(() => {
      dispatch(emptyNotification())
    }, 5000)
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
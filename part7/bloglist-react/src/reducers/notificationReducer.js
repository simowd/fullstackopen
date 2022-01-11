let notificationTimeoutId = null
const initialState = {
  message: null,
  status: false
}

export const emptyNotification = () => {
  return {
    type: 'EMPTY_NOTIFICATION',
    data: ''
  }
}

export const setNotification = (notification, time) => {
  return async dispatch => {

    dispatch({
      type: 'NEW_NOTIFICATION',
      data: notification
    })
    notificationTimeoutId = setTimeout(() => {
      clearTimeout(notificationTimeoutId)
      dispatch({
        type: 'EMPTY_NOTIFICATION',
        data: ''
      })
    }, time * 1000)
  }
}

const reducer = (state = initialState, action) => {
  console.log('Notification state now', state)
  console.log('Notification action now', action)
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return action.data
  case 'EMPTY_NOTIFICATION':
    return initialState
  }

  return state
}

export default reducer
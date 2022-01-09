const initialState = ''
let lastNotificationTimeoutId = null

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: message
    })
    clearTimeout(lastNotificationTimeoutId)
    lastNotificationTimeoutId = setTimeout(() => {
      dispatch({
        type: 'EMPTY_NOTIFICATION',
        data: ''
      })
    },time * 1000)
  }
}

export const emptyNotification = () => {
  return {
    type: 'EMPTY_NOTIFICATION',
    data: ''
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data
    case 'EMPTY_NOTIFICATION':
      return ''
    default:
      break;
  }
  return state
}

export default reducer
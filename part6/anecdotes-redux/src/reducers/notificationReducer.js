const initialState = ''

export const voteNotification = (anecdote) => {
  return {
    type: 'VOTE_NOTIFICATION',
    data: anecdote
  }
}

export const newNotification = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote
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
    case 'NEW_ANECDOTE':
      return action.data + ' created'
    case 'VOTE_NOTIFICATION':
      return 'you voted \''+ action.data + '\''
    case 'EMPTY_NOTIFICATION':
      return ''
    default:
      break;
  }
  return state
}

export default reducer
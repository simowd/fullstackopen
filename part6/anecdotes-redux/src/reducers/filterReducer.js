const initialState = ''

export const changeFilter = (content) => {
  return {
    type: 'CHANGE',
    data: content
  }
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'CHANGE':
      return action.data
    default:
      break;
  }
  return state
}

export default reducer
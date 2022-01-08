const initialState = 'Hello there. General Kenobi'

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  return state
}

export default reducer
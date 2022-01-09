import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const response = await anecdoteService.createNewAnecdote(content)
    console.log(response)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: content
    })
  }
}

export const voteAnecdote = (id, vote) => {
  return async dispatch => {
    const response = await anecdoteService.voteAnecdote(id, vote)
    console.log(response)
    dispatch({
      type: 'VOTE',
      data: id
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  let newState = { ...state }
  switch (action.type) {
    case 'VOTE':
      const id = action.data
      newState = state.map((a) => a.id === id ? { ...a, votes: a.votes + 1 } : a)
      return newState.sort((f, s) => s.votes - f.votes)
    case 'NEW_ANECDOTE':
      return state.concat(asObject(action.data))
    case 'INIT_ANECDOTES':
      return action.data
    default:
      break;
  }
  return state
}

export default reducer
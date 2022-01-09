import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll= async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewAnecdote = async (content) => {
  const response = await axios.post(baseUrl, {content, votes: 0})
  return response
}

const voteAnecdote = async (id, votes) => {
  const response = await axios.patch(baseUrl + '/' + id, {votes: votes + 1})
  return response
}

export default { getAll, createNewAnecdote, voteAnecdote }
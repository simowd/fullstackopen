import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Notification from "./Notification"
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if(state.filter === ''){
      return state.anecdotes
    }
    else{
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
  })
  const dispatch = useDispatch()

  const vote = (id, name,votes) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id, votes))
    dispatch(setNotification(`you voted '${name}'`, 5))
  }

  return (
    <div>
      <Notification />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
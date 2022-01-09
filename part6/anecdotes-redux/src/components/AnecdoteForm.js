import React from "react"
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log(content);
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`you voted '${content}'`, 10)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    createAnecdote: value => {
      dispatch(createAnecdote(value))
    },
    setNotification: (content, time) => {
      dispatch(setNotification(content, time))
    }
  }
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
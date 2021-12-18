import React, { useState } from 'react'

const MostVoted = ({anecdotes, votes}) => {
  const mostVoted = votes.indexOf(Math.max(...votes))

  return(
    <div>
      {anecdotes[mostVoted]}
      <br/>
      has {votes[mostVoted]} votes
      <br/>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  let filled = new Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(filled)
   
  const [selected, setSelected] = useState(0)

  const changeSelection = (max) => {
    let newSelection = Math.floor(Math.random() * anecdotes.length);
    setSelected(newSelection); 
  }

  const voteSelection = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      has {votes[selected]} votes
      <br/>
      <button onClick={voteSelection}>vote</button>
      <button onClick={changeSelection}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <MostVoted anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App
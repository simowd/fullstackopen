  
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../helpers/queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [changeAuthor] = useMutation(UPDATE_AUTHOR, {
    onError: (error) => {
      console.log("Program has encountered an error")
      console.error(error)
    }
  })
  const query = useQuery(ALL_AUTHORS, {
    pollInterval: 500
  })

  if (!props.show) {
    return null
  }

  if(query.loading){
    return <div>loading...</div>
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log('updating author')

    let bornNumber = parseInt(born)

    changeAuthor({ variables: { name, born: bornNumber } })

    setName('')
    setBorn('')
  }

  const authors = query.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            type='number'
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors

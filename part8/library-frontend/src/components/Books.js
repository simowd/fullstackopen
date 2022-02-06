import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../helpers/queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  
  const query = useQuery(ALL_BOOKS, {
    pollInterval: 0
  })

  if (!props.show) {
    return null
  }

  if (query.loading) {
    return <div>loading...</div>
  }

  const filterList = (genre) => {
    if(genre === 'show all genres'){
      setBooks([])
    }
    else{
      const newBooks = query.data.allBooks.filter((book) => book.genres.includes(genre))
      setBooks(newBooks)
    }
  }

  const genreButtons = () => {
    const filteredGenres = query.data.allBooks.map(book => book.genres).reduce((list, genres) => {
      for (const genre of genres) {
        if (!list.find(element => genre.toString().toLowerCase() === element.toString().toLowerCase())) {
          list = list.concat(genre)
        }
      }
      return list
    }, []).concat('show all genres')
    return <>
      {filteredGenres.map(genre => <button key={genre} onClick={() => filterList(genre)}>{genre}</button>)}
    </>
  }

  const listRender = () => {
    if(books.length === 0){
      return query.data.allBooks.map(a =>
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      )
    }
    else{
      return books.map(a =>
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      )
    }
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {listRender()}
        </tbody>
      </table>
      {genreButtons()}
    </div>
  )
}

export default Books
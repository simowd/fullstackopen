import React, { useEffect, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from '../helpers/queries'

const Books = (props) => {
  const [constantBooks, setConstantBooks] = useState([])
  const [books, setBooks] = useState([])
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: (({ subscriptionData }) => {
      console.log(subscriptionData)
      //alert(`Book ${subscriptionData.data.bookAdded.title} added`)
      setConstantBooks(constantBooks.concat(subscriptionData.data.bookAdded))
    })
  })

  const query = useQuery(ALL_BOOKS, {
    pollInterval: 0
  })

  useEffect(() => {
    if (!query.loading) {
      setConstantBooks(query.data.allBooks)
    }
  }, [query.loading])



  if (!props.show) {
    return null
  }

  if (query.loading) {
    return <div>loading...</div>
  }

  const filterList = (genre) => {
    //query.refetch()
    if (genre === 'show all genres') {
      setBooks([])
    }
    else {
      const newBooks = constantBooks.filter((book) => book.genres.includes(genre))
      setBooks(newBooks)
    }
  }

  const genreButtons = () => {
    const filteredGenres = constantBooks.map(book => book.genres).reduce((list, genres) => {
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
    if (books.length === 0) {
      return constantBooks.map(a =>
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      )
    }
    else {
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
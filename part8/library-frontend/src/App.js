
import { useApolloClient } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const loginView = () => {
    return <>
      <button onClick={() => setPage('login')}>login</button>
    </>
  }

  const logoutView = () => {
    return <>
      <button onClick={() => setPage('add')}>add book</button>
      <button onClick={() => logout()}>logout</button>
    </>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          !token ? loginView() : logoutView()
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        setToken={setToken}
        setPage={setPage}
        show={page === 'login'}
      />

    </div>
  )
}

export default App
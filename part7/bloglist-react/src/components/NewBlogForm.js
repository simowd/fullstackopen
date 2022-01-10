import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const NewBlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  //const user = JSON.parse(window.localStorage.getItem('user'))

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      dispatch(createBlog(newBlog))
      setAuthor('')
      setTitle('')
      setUrl('')
      const notificationMessage = {
        message: `A new blog "${newBlog.title}" has been created`,
        status:false
      }
      dispatch(setNotification(notificationMessage,5))
    }
    catch (exception) {
      console.log(exception)
    }

  }

  return (
    <div>
      <form onSubmit={handleNewBlog}>
        <div>
                    title:
          <input
            type="text"
            value={title}
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
                    author:
          <input
            type="text"
            value={author}
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
                    url:
          <input
            type="text"
            value={url}
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='create' type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
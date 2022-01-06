import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ blogs, setBlogs, setNotificationMessage, setnotificationStatus }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  //const user = JSON.parse(window.localStorage.getItem('user'))

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      const newBlogData = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(newBlogData))
      setAuthor('')
      setTitle('')
      setUrl('')
      setNotificationMessage(`A new blog "${newBlogData.title}" has been created`)
      setnotificationStatus(false)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
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
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
                    author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
                    url:
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
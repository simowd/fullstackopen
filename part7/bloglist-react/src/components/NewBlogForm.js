import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Form, FormControl, Button, Container, FormGroup, FormLabel } from 'react-bootstrap'

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
    <Container>
      <Form onSubmit={handleNewBlog}>
        <FormGroup>
          <FormLabel> Title: </FormLabel>
          <FormControl
            type="text"
            value={title}
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel> Author: </FormLabel>
          <FormControl
            type="text"
            value={author}
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel> URL: </FormLabel>
          <FormControl
            type="text"
            value={url}
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </FormGroup>
        <Button id='create' type="submit">Create</Button>
      </Form>
    </Container>
  )
}

export default NewBlogForm
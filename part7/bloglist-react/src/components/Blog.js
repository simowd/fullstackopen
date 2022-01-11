import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog, newComment } from '../reducers/blogReducer'
import { useHistory, useParams } from 'react-router-dom'
import { getBlogs } from '../reducers/blogReducer'
import { Button, ListGroup, ListGroupItem, FormGroup, Form, FormLabel, FormControl } from 'react-bootstrap'

const Blog = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const [comment, setComment] = useState('')
  const blog = useSelector(state => state.blogs.find((b) => b.id === params.id))

  if (!blog) {
    dispatch(getBlogs())
    return null
  }

  const likeButtonBlog = async () => {
    dispatch(likeBlog(blog))
  }

  const deleteButtonBlog = async () => {
    dispatch(deleteBlog(blog))
    history.push('/')
  }

  const addComment = async (event) => {
    event.preventDefault()
    dispatch(newComment(blog, comment))
    setComment('')
  }

  return (
    <div id={blog.title}>
      <h3>{blog.title} by {blog.author}</h3>
      <a href={blog.url}>{blog.url}</a>
      <br />
      likes <span id={`${blog.title}-likes`}>{blog.likes}</span> <Button onClick={likeButtonBlog}>like</Button>
      <br />
      added by: {blog.user.name}
      <br />
      <Button onClick={deleteButtonBlog}>remove</Button>
      <br />
      <br />
      <br />
      <Form onSubmit={addComment}>
        <FormGroup>
          <FormLabel>Add comment: </FormLabel>
          <FormControl type="text"
            value={comment}
            id="username"
            onChange={({ target }) => setComment(target.value)} />
        </FormGroup>
        <Button type="submit">add comment</Button>
      </Form>

      <h4>comments</h4>
      <ListGroup>
        {blog.comments.map(b => <ListGroupItem key={b}>{b}</ListGroupItem>)}
      </ListGroup>
    </div>
  )
}

export default Blog
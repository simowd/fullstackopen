import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog, newComment } from '../reducers/blogReducer'
import { useHistory, useParams } from 'react-router-dom'
import { getBlogs } from '../reducers/blogReducer'

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
      likes <span id={`${blog.title}-likes`}>{blog.likes}</span> <button onClick={likeButtonBlog}>like</button>
      <br />
      added by: {blog.user.name}
      <br />
      <button onClick={deleteButtonBlog}>remove</button>
      <br />
      <br />
      <br />
      <form onSubmit={addComment}>
        <input type="text"
          value={comment}
          id="username"
          onChange={({ target }) => setComment(target.value)} />
        <button>add comment</button>
      </form>

      <h4>comments</h4>
      <ul>
        {blog.comments.map(b => <li key={b}>{b}</li>)}
      </ul>
    </div>
  )
}

export default Blog
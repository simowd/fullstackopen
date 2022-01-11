import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useHistory, useParams } from 'react-router-dom'
import { getBlogs } from '../reducers/blogReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
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

      <h4>comments</h4>
      <li>
        {blog.comments.map(b => <ul key={b}>{b}</ul>)}
      </li>
    </div>
  )
}

export default Blog
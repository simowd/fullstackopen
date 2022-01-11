import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(true)
  const dispatch = useDispatch()

  const containerStyle = {
    border: '1px',
    boderColor: 'black',
    borderStyle: 'solid',
    padding: '0.5rem',
    margin: '0.5rem',
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeButtonBlog = async () => {
    dispatch(likeBlog(blog))
  }

  const deleteButtonBlog = async () => {
    dispatch(deleteBlog(blog))
  }

  const showTitle = () => {
    return (
      <div style={containerStyle} className='blogWrapped'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}> view </button>
      </div>
    )
  }

  const showDetails = () => {
    return(
      <div style={containerStyle} className='blogUnwrapped'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}> hide </button>
        <br />
        {blog.url}
        <br />
        likes <span id={`${blog.title}-likes`}>{blog.likes}</span> <button onClick={likeButtonBlog}>like</button>
        <br />
        {blog.user.name}
        <br />
        <button onClick={deleteButtonBlog}>remove</button>
      </div>
    )
  }

  return (
    <div id={blog.title}>
      {visible ? showTitle() : showDetails()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
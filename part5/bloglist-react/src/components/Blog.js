import React, { useState, useEffect } from 'react'
import blogHelper from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(true)

  const containerStyle = {
    border: '1px',
    boderColor: 'black',
    borderStyle: 'solid',
    padding: '0.5rem',
    margin: '0.5rem',
  }

  useEffect(() => {

  })

  const toggleVisibility = () => {
    setVisible(!visible)
    
  }

  const addLike = async () => {
    await blogHelper.addLike(blog)
    setBlogs(blogs.filter(b => b.id !== blog.id).concat({...blog, likes: blog.likes + 1}))
  }

  const showTitle = () => {
    return (
      <div style={containerStyle}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}> view </button>
      </div>
    )
  }

  const showDetails = () => {
    return(
      <div style={containerStyle}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}> hide </button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={addLike}>like</button>
        <br />
        {blog.user.name}
      </div>
    )
  }

  return (
    <div>
      {visible ? showTitle() : showDetails()}
    </div>
  )
}
export default Blog
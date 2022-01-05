import React, { useState, useEffect } from 'react'

const Blog = ({ blog, key }) => {
  const [visible, setVisible] = useState(true)

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
        likes {blog.likes} <button>like</button>
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
import React from 'react'
const Blog = ({blog, key}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

export default Blog
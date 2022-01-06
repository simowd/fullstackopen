import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blog) => {
  const config = {
    headers: {Authorization:token}
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const addLike = async (blog) => {
  const config = {
    headers: {Authorization:token}
  }
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1
  }

  delete updatedBlog.user

  const response = await axios.put(baseUrl + `/${blog.id}`, updatedBlog, config)
  console.log(response)
}

const remove = async (blog) => {
  const config = {
    headers: {Authorization:token}
  }
  const response = await axios.delete(baseUrl + `/${blog.id}`, config)
  console.log(response)
} 

export default { getAll, setToken, createBlog, addLike, remove }
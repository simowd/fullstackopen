import blogService from '../services/blogs'

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: blogs.sort((first, second) => second.likes - first.likes)
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const blogResponse = await blogService.createBlog(blog)
    dispatch({
      type: 'CREATE_BLOG',
      data: blogResponse
    })
  }
}


const reducer = (state = [], action) => {
  switch(action.type){
  case('GET_BLOGS'):
    return action.data
  case('CREATE_BLOG'):
    return state.concat(action.data)
  }
  return state
}

export default reducer
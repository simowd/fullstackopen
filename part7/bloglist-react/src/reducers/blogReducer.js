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

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.addLike(blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: blog
    })
  }
}

export const newComment = (blog, comment) => {
  return async (dispatch) => {
    await blogService.addComment(blog, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: { blog, comment }
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type){
  case('GET_BLOGS'):
    return action.data
  case('CREATE_BLOG'):
    return state.concat(action.data)
  case('DELETE_BLOG'):
    return state.filter(b => b.id !== action.data.id).sort((first, second) => second.likes - first.likes)
  case('LIKE_BLOG'):
    return state.filter(b => b.id !== action.data.id).concat({ ...action.data, likes: action.data.likes + 1 }).sort((first, second) => second.likes - first.likes)
  case('ADD_COMMENT'):
    return state.filter(b => b.id !== action.data.blog.id).concat({ ...action.data.blog, comments: action.data.blog.comments.concat(action.data.comment) }).sort((first, second) => second.likes - first.likes)
  }
  return state
}

export default reducer
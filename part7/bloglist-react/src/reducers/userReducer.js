import loginService from '../services/login'
import blogService from '../services/blogs'

export const loadUser = () => {
  const loggedUserJSON = window.localStorage.getItem('user')
  if (loggedUserJSON) {
    const userParsed = JSON.parse(loggedUserJSON)
    blogService.setToken(userParsed.token)
    return {
      type: 'LOAD_USER',
      data: userParsed
    }
  }
  return null
}

export const setUser = (username, password) => {
  return async (dispatch) => {
    const userServer = await loginService.login({
      username, password,
    })

    window.localStorage.setItem('user', JSON.stringify(userServer))

    dispatch({
      type: 'SET_USER',
      data: userServer
    })
  }
}

export const clearUser = () => {
  window.localStorage.removeItem('user')
  return{
    type: 'CLEAR_USER',
    data: ''
  }
}

const reducer = (state = null, action) => {
  switch(action.type){
  case('SET_USER'):
    return action.data
  case('CLEAR_USER'):
    return null
  case('LOAD_USER'):
    return action.data
  }
  return state
}

export default reducer
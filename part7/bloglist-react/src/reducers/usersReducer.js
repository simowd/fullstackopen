import usersService from '../services/users'

export const getUsers = () => {
  return async (dispatch) => {
    const userServer = await usersService.users()

    dispatch({
      type: 'GET_USERS',
      data: userServer
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type){
  case('GET_USERS'):
    return action.data
  }
  return state
}

export default reducer
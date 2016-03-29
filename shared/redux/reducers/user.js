import * as ActionTypes from '../constants/constants';

const initialState ={
  isLogin: true,
  message: '',
  isWaiting: false,
  authenticated: false }

export default (state = initialState, action={}) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS_USER:
      return Object.assign({},state,action.user);
    case ActionTypes.LOGOUT_SUCCESS_USER:
      return Object.assign({},state,action.user);
    case ActionTypes.SIGNUP_SUCCESS_USER:
      return Object.assign({},state,action.user);
    case ActionTypes.LOGIN_ERROR_USER:
      return Object.assign({},state,{message:action.message});
    case "MESSAGE_CLEAR":
      return Object.assign({},state,{message:""});
    default:
      return state;
  }
}

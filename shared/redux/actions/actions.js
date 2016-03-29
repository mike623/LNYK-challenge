import * as ActionTypes from '../constants/constants';
import fetch from 'isomorphic-fetch';
import request from 'axios';
import { push } from 'react-router-redux';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${(process.env.PORT || 8000)}`) : '';


function makeActionCreator(type, ...argNames) {
  return function(...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}



export function changeExpert(payload) {
  return {
    type:ActionTypes.CHANGE_EXPERT_STATUS,
    payload,
  }
}

export function historyAdd(payload) {
  console.log("historyAdd payload",payload);
  const act = makeActionCreator(ActionTypes.HISTORY_ADD,'history')(payload)
  return act
}

export function fetchHistory() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getHistories`).
      then((response) => response.json()).
      then((response) => dispatch(
        makeActionCreator(ActionTypes.HISTORY_GET,'histories')(response)
      ));
  };
}



export function changeExpertStatus(payload) {
  return (dispatch) => {
    fetch(`${baseURL}/api/changeExpertStatus`, {
      method: 'post',
      body: JSON.stringify(payload),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(dispatch(changeExpert(payload)))
  };
}





export function addSelectedProject(project) {
  console.log("addSelectedProject");
  return {
    type: ActionTypes.ADD_SELECTED_PROJECT,
    project,
  };
}

export function getProjectRequest(cuid) {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getProject?cuid=${cuid}`, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((response) => response.json()).then(res => dispatch(addSelectedProject(res.project)));
  };
}



export function addProjects(projects) {
  return {
    type: ActionTypes.ADD_PROJECT,
    projects,
  };
}


export function fetchProjects() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getProjects`).
      then((response) => response.json()).
      then((response) => dispatch(addProjects(response.projects)));
  };
}



export function signup(data){
  return (dispatch) => {
    fetch(`${baseURL}/api/signup`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then((response) => response.json())
    .then((response) => {
      const user = {
        authenticated:true,
        isLogin:true,
      }
      const action = makeActionCreator(
        ActionTypes.SIGNUP_SUCCESS_USER,
        'user'
      )(user);
      dispatch(action);
      dispatch({type:"MESSAGE_CLEAR"});
      dispatch(push('/home'));
    })
  };
}
export function login(data){
  return (dispatch) => {
    fetch(`${baseURL}/api/login`, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then((response) => {
      if(response.status !==200){
        response.json().then(payload => {
          console.log({payload})
          dispatch(makeActionCreator(
            ActionTypes.LOGIN_ERROR_USER,
            'message'
          )(payload.message))
        })
        throw new Error("login error");
      }else {
        return response.json()
      }
    })
    .then((response) => {
      const user = {
        authenticated:true,
        isLogin:true,
      }
      const action = makeActionCreator(
        ActionTypes.LOGIN_SUCCESS_USER,
        'user'
      )(user);
      dispatch(action);
      dispatch({type:"MESSAGE_CLEAR"});
      dispatch(push('/home'));
    })

  };
}
export function logout(){
  return (dispatch) => {
    fetch(`${baseURL}/api/logout`, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify({}),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then((response) => response.json())
    .then(response => {
      const user = {
        authenticated:false,
        isLogin:false,
      }
      const action = makeActionCreator(
        ActionTypes.LOGOUT_SUCCESS_USER,
        'user'
      )(user);
      dispatch(action);
      dispatch({type:"MESSAGE_CLEAR"});
      dispatch(push('/login'));
    })
  };
}









/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint - defaults to /login
 * @return Promise
 */
function makeUserRequest(method, data, api='/login') {
  return request({
    url: api,
    method: method,
    data: data,
    withCredentials: true
  });
}

function loginSuccess(message) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message: message
  };
}



export function manualLogin(data) {
  return dispatch => {
    // dispatch(beginLogin());

    return makeUserRequest('post', data, '/api/login')
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data.message));
          // dispatch(push('/'));
        } else {
          console.log("response.data.message",response.data.message);
          // dispatch(loginError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        console.log("err.data.message",err.data.message)
        // dispatch(loginError(err.data.message));
      });
  };
}

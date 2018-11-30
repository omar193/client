import axios from 'axios';
import { 
  AUTH_SIGN_UP, 
  AUTH_SIGN_OUT, 
  AUTH_SIGN_IN, 
  AUTH_ERROR,
  HASH_POST_IN,
  DASHBOARD_GET_DATA } from './types';

export const signUp = data => {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:5000/users/signup', data);

      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token
      });
      
      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'username is already in use'
      })
    }
  };
}



export const signIn = data => {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:5000/users/signin', data);

      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token
      });
 
      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'username and password combination isn\'t valid'
      })
    }
  };
}

export const getSecret = () => {
  return async dispatch => {
    try {
      const res = await axios.get('http://localhost:5000/users/secret')

      dispatch({
        type: DASHBOARD_GET_DATA,
        payload: res.data.secret
      })

    } catch(err) {
      console.error('err', err)
    }
  }
}

export const signOut = () => {
  return dispatch => {
    localStorage.removeItem('JWT_TOKEN');
    axios.defaults.headers.common['Authorization'] = '';

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: ''
    })
  };
}
export const calculateHash = data => {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:5000/hashes/calculateHash', data);

      dispatch({
        type: HASH_POST_IN,
        payload: res.data.hash
      });
      
      localStorage.setItem('JWT_TOKEN', res.data.hash);
      axios.defaults.headers.common['Authorization'] = res.data.hash;
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'please try again'
      })
    }
  };
}

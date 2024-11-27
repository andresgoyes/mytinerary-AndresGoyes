// authActions.js
import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';

const setAuthData = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

const removeAuthData = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export const login = ({ email, password }) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post('http://localhost:8080/api/auth/signIn', { email, password });

    if (response.data.success) {
      const { token, user } = response.data;
      setAuthData(user, token);
      dispatch({ type: LOGIN_SUCCESS, payload: { user, token } });
      return true;
    } else {
      dispatch({ type: LOGIN_FAILURE, payload: response.data.response });
      return false;
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    return false;
  }
};

export const setUser = (userData) => {
  setAuthData(userData.user, userData.token);
  return { type: SET_USER, payload: userData };
};

export const logout = () => (dispatch) => {
  removeAuthData();
  dispatch({ type: LOGOUT });
};
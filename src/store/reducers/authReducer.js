import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SET_USER, LOGOUT } from '../actions/authActions';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,  // Recuperamos el user desde localStorage
  token: localStorage.getItem('token') || null,  // Recuperamos el token desde localStorage
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        user: null,
        token: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        token: null,
      };
    case SET_USER:
      localStorage.setItem('user', JSON.stringify(action.payload.user));  // Guardamos el user en localStorage
      localStorage.setItem('token', action.payload.token);  // Guardamos el token en localStorage
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
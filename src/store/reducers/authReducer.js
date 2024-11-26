import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SET_USER, LOGOUT } from '../actions/authActions';

const initialState = {
    user: null,
    token: null,
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
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
            };
        case LOGOUT:
            localStorage.removeItem('token');
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
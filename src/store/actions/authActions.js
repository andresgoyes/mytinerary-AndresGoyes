import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';

export const login = ({ email, password }) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        try {
            const credentials = { email, password };
            const response = await axios.post('http://localhost:8080/api/auth/signIn', credentials);

            console.log("Respuesta de la API:", response.data);  // Aquí verificamos los datos de la respuesta

            if (response.data.success) {
                // Si el login es exitoso
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user)); // Guardamos los datos del usuario también
                dispatch({ type: LOGIN_SUCCESS, payload: response.data });  // Dispatch con los datos correctos
                return true; // Indicar éxito
            } else {
                dispatch({ type: LOGIN_FAILURE, payload: response.data.response });
                return false; // Indicar fracaso
            }
        } catch (error) {
            dispatch({ type: LOGIN_FAILURE, payload: error.message });
            return false; // Indicar fallo si ocurre un error
        }
    };
};

export const setUser = (userData) => {
    return {
        type: SET_USER,
        payload: userData,
    };
};

export const logout = () => {
    return (dispatch) => {
        // Eliminar datos del localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Despachar acción para actualizar el estado
        dispatch({
            type: 'LOGOUT',
        });
    };
};
import axios from 'axios';

export const FETCH_CITIES_REQUEST = 'FETCH_CITIES_REQUEST';
export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS';
export const FETCH_CITIES_FAILURE = 'FETCH_CITIES_FAILURE';

export const fetchCities = (searchValue = '') => {
    return async (dispatch) => {
        dispatch({ type: FETCH_CITIES_REQUEST });
        try {
            const response = await axios.get(`http://localhost:8080/api/cities/all?name=${searchValue}`);            
            dispatch({ type: FETCH_CITIES_SUCCESS, payload: response.data.response });
        } catch (error) {
            dispatch({ type: FETCH_CITIES_FAILURE, payload: error.message });
        }
    };
};

import axios from 'axios';

export const FETCH_CITY_DETAIL_REQUEST = 'FETCH_CITY_DETAIL_REQUEST';
export const FETCH_CITY_DETAIL_SUCCESS = 'FETCH_CITY_DETAIL_SUCCESS';
export const FETCH_CITY_DETAIL_FAILURE = 'FETCH_CITY_DETAIL_FAILURE';

export const fetchCityDetail = (id) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_CITY_DETAIL_REQUEST });
        try {
            const response = await axios.get(`http://localhost:8080/api/cities/id/${id}`);
            dispatch({ type: FETCH_CITY_DETAIL_SUCCESS, payload: response.data.response });
        } catch (error) {
            dispatch({ type: FETCH_CITY_DETAIL_FAILURE, payload: error.message });
        }
    };
};
import axios from 'axios';

export const FETCH_ITINERARIES_REQUEST = 'FETCH_ITINERARIES_REQUEST';
export const FETCH_ITINERARIES_SUCCESS = 'FETCH_ITINERARIES_SUCCESS';
export const FETCH_ITINERARIES_FAILURE = 'FETCH_ITINERARIES_FAILURE';

export const fetchItinerariesRequest = () => ({
    type: FETCH_ITINERARIES_REQUEST,
});

export const fetchItinerariesSuccess = (itineraries) => ({
    type: FETCH_ITINERARIES_SUCCESS,
    payload: itineraries,
});

export const fetchItinerariesFailure = (error) => ({
    type: FETCH_ITINERARIES_FAILURE,
    payload: error,
});

export const fetchItineraries = (cityId) => {
    return async (dispatch) => {
        dispatch(fetchItinerariesRequest());
        try {
            const response = await axios.get(`https://mytinerary-back-andresgoyes.onrender.com/api/itineraries/itinerary/${cityId}`);
            dispatch(fetchItinerariesSuccess(response.data.response));
        } catch (error) {
            dispatch(fetchItinerariesFailure(error.message));
        }
    };
};
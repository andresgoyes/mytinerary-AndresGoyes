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
            const response = await fetch(`http://localhost:8080/api/itineraries/itinerary/${cityId}`);
            if (!response.ok) throw new Error('Error fetching itineraries');
            const data = await response.json();
            dispatch(fetchItinerariesSuccess(data.response));
        } catch (error) {
            dispatch(fetchItinerariesFailure(error.message));
        }
    };
};
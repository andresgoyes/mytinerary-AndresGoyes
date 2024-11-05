import {
    FETCH_ITINERARIES_REQUEST,
    FETCH_ITINERARIES_SUCCESS,
    FETCH_ITINERARIES_FAILURE
} from '../actions/itinerariesActions';

const initialState = {
    loading: false,
    itineraries: [],
    error: null,
};

const itinerariesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ITINERARIES_REQUEST:
            return { ...state, loading: true };
        case FETCH_ITINERARIES_SUCCESS:
            return { loading: false, itineraries: action.payload, error: null };
        case FETCH_ITINERARIES_FAILURE:
            return { loading: false, itineraries: [], error: action.payload };
        default:
            return state;
    }
};

export default itinerariesReducer;
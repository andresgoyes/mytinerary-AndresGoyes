import { FETCH_CITY_DETAIL_REQUEST, FETCH_CITY_DETAIL_SUCCESS, FETCH_CITY_DETAIL_FAILURE } from '../actions/cityDetailActions';

const initialState = {
    loading: true,
    city: {},
    error: null,
};

const cityDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CITY_DETAIL_REQUEST:
            return { ...state, loading: true };
        case FETCH_CITY_DETAIL_SUCCESS:
            return { loading: false, city: action.payload, error: null };
        case FETCH_CITY_DETAIL_FAILURE:
            return { loading: false, city: {}, error: action.payload };
        default:
            return state;
    }
};

export default cityDetailReducer;
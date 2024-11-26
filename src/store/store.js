import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './reducers/citiesReducer';
import cityDetailReducer from './reducers/cityDetailReducer';
import itinerariesReducer from './reducers/itinerariesReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    cities: citiesReducer,    
    cityDetail: cityDetailReducer,
    itineraries: itinerariesReducer,
    auth: authReducer
  },
});

export default store;
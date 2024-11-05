import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './reducers/citiesReducer';
import cityDetailReducer from './reducers/cityDetailReducer';
import itinerariesReducer from './reducers/itinerariesReducer';

const store = configureStore({
  reducer: {
    cities: citiesReducer,    
    cityDetail: cityDetailReducer,
    itineraries: itinerariesReducer
  },
});

export default store;
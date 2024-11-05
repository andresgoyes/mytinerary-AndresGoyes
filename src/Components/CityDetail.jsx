import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityDetail } from '../store/actions/cityDetailActions';
import Itineraries from './Itineraries';

const CityDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
        
    const cityDetail = useSelector(state => state.cityDetail);
    
    useEffect(() => {
        dispatch(fetchCityDetail(id));
    }, [dispatch, id]);
    
    const scrollToItineraries = () => {
        const itinerariesSection = document.getElementById('itineraries');
        if (itinerariesSection) {
            itinerariesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (cityDetail.loading) return <div>Loading...</div>;
    if (cityDetail.error) return <div>Error: {cityDetail.error}</div>;

    const city = cityDetail.city;

    return (
        <div>
            <div className="w-full relative overflow-hidden" style={{ height: 'calc(100vh - 4rem)' }}>
                <img
                    src={city.photo}
                    alt={city.name}
                    className="w-full h-full object-cover absolute object-center brightness-[.65] shadow-lg animate-zoom"
                />
                <div className="flex flex-col gap-4 items-center h-screen">
                    <div className="h-screen flex flex-col justify-center items-center text-neutral-100 text-center max-w-2xl gap-4 z-10">
                        <h1 className="text-5xl font-bold">{city.name}</h1>
                        <p className="text-2xl italic font-light">{city.description}</p>
                        <div className="flex flex-col items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="disabled:cursor-not-allowed disabled:brightness-75 hover:bg-blue-600 active:scale-95 disabled:active:scale-100 transition-all bg-blue-700 text-white shadow-lg font-bold rounded-lg p-3 text-center bg-white/30 text-xl px-8"
                            >
                                Back to Cities
                            </button>
                            <button
                                onClick={scrollToItineraries}
                                className="disabled:cursor-not-allowed disabled:brightness-75 hover:bg-blue-600 active:scale-95 disabled:active:scale-100 transition-all bg-blue-700 text-white shadow-lg font-bold rounded-lg p-3 text-center text-xl px-8"
                            >
                                View Itineraries ↓
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 p-4">
                <Itineraries />
            </div>
        </div>
    );
};

export default CityDetail;
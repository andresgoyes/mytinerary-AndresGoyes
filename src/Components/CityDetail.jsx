import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CityDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [city, setCity] = useState(null);

    useEffect(() => {
        const fetchCityDetail = async () => {
            const response = await fetch(`http://localhost:8080/api/cities/id/${id}`);
            const data = await response.json();
            setCity(data.response);
        };

        fetchCityDetail();
    }, [id]);

    if (!city) return <div>Loading...</div>;

    return (
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
                            className="disabled:cursor-not-allowed disabled:brightness-75 hover:bg-blue-600 active:scale-95 disabled:active:scale-100 transition-all bg-blue-700 text-white shadow-lg font-bold rounded-lg p-3 text-center text-xl px-8"
                        >
                            Back to Cities
                        </button>                        
                    </div>
                </div>
            </div>
        </div>
    );


};

export default CityDetail;
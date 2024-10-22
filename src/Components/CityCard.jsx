import React from "react";
import { useNavigate } from 'react-router-dom';

const CityCard = ({ city }) => {
    const navigate = useNavigate();
    const handleViewMore = () => {
        navigate(`/city/${city._id}`);
    };
    return (
        <div className="relative bg-white shadow-md rounded-lg overflow-hidden w-80">
            <img src={city.photo} alt={city.name} className="w-full h-48 object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>



            <div className="absolute top-0 left-0 p-4 text-white">
                <h3 className="text-2xl font-semibold">{city.name}</h3>
                <p className="text-sm">{city.country}</p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <button
                    onClick={handleViewMore}
                    className="text-overlay absolute bottom-4 left-4 text-white font-bold text-xl bg-opacity-75 bg-black p-2 rounded-lg opacity-75 hover:bg-stone-900 hover:opacity-100 transition-all duration-300"
                >
                    View More
                </button>
            </div>
        </div>
    );
};

export default CityCard;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';

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
        <div>
            <h1>{city.name}</h1>
            <img src={city.photo} alt={city.name} />
            <p>{city.description}</p>
            <p>Under construction</p>
            <button onClick={() => navigate(-1)}>Back to Cities</button>
        </div>
    );
};

export default CityDetail;
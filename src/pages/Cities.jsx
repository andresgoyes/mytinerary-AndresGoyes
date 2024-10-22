import React, { useState, useEffect } from 'react';
import CityCard from '../Components/CityCard.jsx';
import SearchBar from '../Components/SearchingBar.jsx';
import { useNavigate } from 'react-router-dom';

const Cities = () => {
    const [searchValue, setSearchValue] = useState('');
    const [cities, setCities] = useState([]);
    const [notFound, setNotFound] = useState(false);
    
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/cities/all?name=' + searchValue);
                if (response.status === 404) {
                    setNotFound(true);
                    setCities([]);
                    return;
                }

                const data = await response.json();
                setCities(data.response || []);
                setNotFound(false);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCities();
    }, [searchValue]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-4 text-center">Cities</h1>
            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {notFound ? (
                    <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center">
                        <div className="flex flex-col text-center gap-2 text-neutral-500 dark:text-neutral-300 bg-slate-300 dark:bg-slate-700 shadow-lg rounded-md p-4 w-full">
                            <i className="text-9xl undefined"></i>
                            <h2 className="text-4xl font-semibold">No Results Found</h2>
                            <p className="text-2xl">We couldn't find any cities with the provided name.</p>
                        </div>
                    </div>
                ) : (
                    cities.map((city) => {                                                
                        return <CityCard key={city._id} city={city} />;
                    })
                )}
            </div>
        </div>
    );
};

export default Cities;

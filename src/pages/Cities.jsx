import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from '../store/actions/citiesActions';
import Banner from '../Components/Banner';
import CityCard from '../Components/CityCard';
import SearchBar from '../Components/SearchingBar';

const Cities = () => {
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    const { cities, loading, error } = useSelector((state) => state.cities);

    useEffect(() => {
        dispatch(fetchCities());
    }, [dispatch]);
    
    const filteredCities = cities.filter((city) =>
        city.name.toLowerCase().startsWith(searchValue.toLowerCase())
    );

    return (
        <>
            <div>
                <Banner />
            </div>

            <div className="max-w-max mx-auto px-4 py-6">
                <div className="max-w-md mx-auto mt-2 w-full sm:w-3/4 lg:w-3/4 mb-10">
                    <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
                </div>

                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="max-w-max col-span-1 sm:col-span-2 lg:col-span-4 flex justify-center">
                        <div className="flex flex-col text-center gap-2 text-neutral-500 dark:text-neutral-300 bg-slate-300 dark:bg-slate-700 shadow-lg rounded-md p-4 w-full">
                            <i className="text-9xl fas fa-exclamation-triangle"></i>
                            <h2 className="text-4xl font-semibold">Error</h2>
                            <p className="text-2xl">{error}</p>
                        </div>
                    </div>
                ) : filteredCities.length === 0 ? (
                    <div className="max-w-max col-span-1 sm:col-span-2 lg:col-span-4 flex justify-center">
                        <div className="flex flex-col text-center gap-2 text-neutral-500 dark:text-neutral-300 bg-slate-300 dark:bg-slate-700 shadow-lg rounded-md p-4 w-full">
                            <i className="text-9xl fas fa-exclamation-triangle"></i>
                            <h2 className="text-4xl font-semibold">No Results Found</h2>
                            <p className="text-2xl">We couldn't find any cities with the provided name.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredCities.map((city) => (
                            <div key={city._id} className="flex justify-center">
                                <CityCard city={city} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Cities;
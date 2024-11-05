import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HeartIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItineraries } from '../store/actions/itinerariesActions';

const Itineraries = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { itineraries, loading, error } = useSelector(state => state.itineraries);
    const [showMore, setShowMore] = useState({});
    const [likedItineraries, setLikedItineraries] = useState({});

    useEffect(() => {
        dispatch(fetchItineraries(id));
    }, [id, dispatch]);

    const toggleShowMore = (itineraryId) => {
        setShowMore((prevShowMore) => ({
            ...prevShowMore,
            [itineraryId]: !prevShowMore[itineraryId],
        }));
    };

    const handleLike = (itineraryId) => {
        setLikedItineraries((prevLiked) => {
            const isLiked = prevLiked[itineraryId];
            // Si ya estaba liked, restamos 1, si no, sumamos 1
            return {
                ...prevLiked,
                [itineraryId]: !isLiked,
            };
        });
    };

    // Actualizar los itinerarios con los likes calculados
    const updatedItineraries = itineraries.map(itinerary => {
        const isLiked = likedItineraries[itinerary._id] || false;
        const newLikes = isLiked ? itinerary.likes + 1 : itinerary.likes - 1; // Si está liked, suma 1, si no, resta 1
        return {
            ...itinerary,
            likes: newLikes < 0 ? 0 : newLikes, // Asegúrate de que los likes no sean negativos
        };
    });

    if (loading) return <div>Loading itineraries...</div>;
    if (error) return <div><p className="text-gray-700 text-xl">No itineraries found for this city.</p></div>;

    return (
        <main className="flex flex-col items-center justify-center py-4">
            <section id="itineraries" className="space-y-10 text-neutral-500 dark:text-neutral-300 text-center">
                <h1 className="text-5xl font-bold">ITINERARIES</h1>
                <div className="flex flex-wrap justify-center gap-12">
                    {updatedItineraries.length > 0 ? (
                        updatedItineraries.map((itinerary) => (
                            <div key={itinerary._id} className="relative overflow-hidden w-full sm:w-[min(100%,40rem)] h-auto border bg-slate-50 dark:bg-black dark:border dark:border-slate-700 rounded-lg shadow-xl p-8 flex flex-col items-start">
                                <div className="flex items-start w-full">
                                    <div className="items-center">
                                        <img src={itinerary.photo} alt={itinerary.name} className="w-28 h-28 rounded-full border-2 border-gray-300 mt-2" />
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500">Created by</p>
                                            <h2 className="font-bold text-lg">{itinerary.name}</h2>
                                        </div>
                                    </div>
                                    <div className="ml-auto flex items-center gap-2">
                                        <HeartIcon onClick={() => handleLike(itinerary._id)} className={`w-8 h-8 cursor-pointer ${likedItineraries[itinerary._id] ? 'text-red-500' : 'text-gray-400'}`} />
                                        <span className="text-gray-700">{itinerary.likes}</span>
                                    </div>
                                </div>

                                <div className="flex w-full justify-center text-3xl text-gray-700 mt-4">
                                    <CurrencyDollarIcon className="w-8 h-8 text-green-500 mr-2" />
                                    <span>{itinerary.price}$</span>
                                </div>
                                <div className="flex w-full justify-center text-3xl text-gray-700 mt-2">
                                    <ClockIcon className="w-8 h-8 text-blue-500 mr-2" />
                                    <span>{itinerary.duration}h</span>
                                </div>

                                <div className="flex w-full justify-center flex-wrap gap-2 mt-4">
                                    {itinerary.hashtags.map((hashtag, index) => (
                                        <p key={index} className="rounded-full text-sm bg-blue-700 text-neutral-100 px-3 py-1 shadow-md">
                                            {hashtag}
                                        </p>
                                    ))}
                                </div>

                                <div className="flex w-full justify-center flex-wrap gap-2 mt-4">
                                    <button onClick={() => toggleShowMore(itinerary._id)} className="bg-blue-700 text-white shadow-lg font-bold rounded-lg p-3 text-center text-xl px-8 hover:bg-blue-600 active:scale-95 transition-all">
                                        {showMore[itinerary._id] ? 'Show Less' : 'View More'}
                                    </button>
                                </div>

                                {showMore[itinerary._id] && (
                                    <div className="mt-4 p-4 border-t border-gray-300 w-full text-center text-gray-500">
                                        <h3 className="text-2xl font-bold">Activities & Comments</h3>
                                        <p className="italic">Under construction</p>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-700 text-xl">No itineraries found for this city.</p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Itineraries;
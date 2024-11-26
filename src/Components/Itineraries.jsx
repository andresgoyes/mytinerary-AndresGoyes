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
        <main className="flex flex-col items-center justify-center">
            <section id="itineraries" className="text-neutral-500 dark:text-neutral-300 text-center">
                <h1 className="text-4xl font-bold mb-12">ITINERARIES</h1>
                <div className="grid justify-items-center gap-8">
                    {updatedItineraries.length > 0 ? (
                        updatedItineraries.map((itinerary) => (
                            <div
                                key={itinerary._id}
                                className="relative overflow-hidden w-[min(100%,34rem)] border bg-slate-50 dark:bg-black dark:border dark:border-slate-700 rounded-lg shadow-xl"
                            >
                                {/* Likes Section */}
                                <div className="absolute left-0 top-0 px-4 py-2 rounded-lg text-2xl gap-2 text-neutral-100 flex bg-neutral-600/50 m-4">
                                    <HeartIcon
                                        onClick={() => handleLike(itinerary._id)}
                                        className={`w-6 h-6 cursor-pointer ${likedItineraries[itinerary._id] ? 'text-red-500' : 'text-gray-400'
                                            }`}
                                    />
                                    <div className="text-lg leading-none text-center">{itinerary.likes}</div>
                                </div>

                                {/* Background Image */}
                                <img
                                    className="w-full aspect-video object-cover"
                                    src={itinerary.photo}
                                    alt={itinerary.name}
                                />

                                {/* Main Content */}
                                <div className="flex p-4 pb-0 gap-4">
                                    {/* Creator Section */}
                                    <div className="flex flex-col items-center justify-center min-w-[5rem]">
                                        <img
                                            className="w-14 sm:w-20 aspect-square object-cover rounded-full shadow-md"
                                            src={itinerary.creatorPhoto}
                                            alt={`Photo of ${itinerary.creator}`}
                                        />
                                        <p className="text-xs font-light mt-1">Created by</p>
                                        <p className="leading-3 font-bold text-center">
                                            {itinerary.creator.split(" ")[0]}
                                        </p>
                                    </div>

                                    {/* Itinerary Details */}
                                    <div className="grid w-full">
                                        <div className="flex flex-wrap w-full text-lg font-medium mt-2 justify-center items-center">
                                            <h1 className="text-right text-lg font-bold rounded-lg uppercase">{itinerary.name}</h1>
                                        </div>
                                        <div className="flex flex-wrap justify-between w-full text-lg font-medium mt-2">
                                            <div className="flex flex-wrap w-full text-lg font-medium mt-2 justify-center items-center">
                                                <CurrencyDollarIcon className="w-8 h-8 text-green-500 mr-2" />
                                                {itinerary.price}
                                            </div>
                                            <div className="flex flex-wrap w-full text-lg font-medium mt-2 justify-center items-center">
                                                <ClockIcon className="w-8 h-8 text-blue-500 mr-2" />
                                                {itinerary.duration}h
                                            </div>
                                        </div>
                                        {/* Hashtags */}
                                        <div className="flex w-full justify-center flex-wrap gap-2 mt-4">
                                            {itinerary.hashtags.map((hashtag, index) => (
                                                <p key={index} className="rounded-full text-sm bg-blue-700 text-neutral-100 px-3 py-1 shadow-md">
                                                    {hashtag}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Toggle Details */}
                                <div className="flex w-full justify-center flex-wrap gap-2 my-4">
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
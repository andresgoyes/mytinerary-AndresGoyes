import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import '../Styles/Slider.css';

const Cities = () => {
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/cities/all');
                const data = await response.json();
                setCities(data.response);                
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCities();
    }, []);
    
    const handleCardClick = (cityId) => {
        navigate(`/city/${cityId}`);
    };

    return (
        <>
            <h2 className="text-4xl font-bold text-center my-10">Popular Itineraries</h2>
            <Swiper
                slidesPerView={1}
                slidesPerGroup={1}
                spaceBetween={30}
                freeMode={true}
                navigation={true}
                modules={[Navigation, Pagination, Autoplay]}
                pagination={{ dynamicBullets: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                breakpoints={{
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                        slidesPerGroup: 2,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                        slidesPerGroup: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                        slidesPerGroup: 4,
                    },
                    1920: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                        slidesPerGroup: 4,
                    }
                }}
                className='mySwiper w-[90%] sm:w-[80%] mx-auto'
            >
                {cities.map((city, i) => (
                    <SwiperSlide key={i}>
                        <div 
                            className='w-96 slider-item mb-6 relative shadow-lg rounded-xl overflow-hidden cursor-pointer'
                            onClick={() => handleCardClick(city._id)}
                        >
                            <div className='image-container flex justify-center items-center'>
                                <img
                                    src={city.photo}
                                    alt={city.name}
                                    className='slider-image'
                                    loading="lazy"
                                />
                                <div className='overlay absolute bottom-0 left-0 w-full h-full bg-black bg-opacity-25'></div>
                                <p className='text-overlay absolute bottom-4 left-4 text-white font-bold text-xl bg-opacity-75 bg-black p-2 rounded-lg'>
                                    {city.name}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default Cities;
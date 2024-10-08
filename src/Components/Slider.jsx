import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import '../Styles/Slider.css';

const Slider = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No hay datos disponibles para mostrar</p>;
    }

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
                className='mySwiper'
            >
                {data.map((d, i) => (
                    <SwiperSlide key={i}>
                        <div className='w-96 slider-item mb-6 relative shadow-lg rounded-xl overflow-hidden'>
                            <div className='image-container flex justify-center items-center'>
                                <img
                                    src={d.img}
                                    alt={d.name}
                                    className='slider-image'
                                    loading="lazy"                                     
                                />
                                <div className='overlay absolute bottom-0 left-0 w-full h-full bg-black bg-opacity-25'></div>
                                <p className='text-overlay absolute bottom-4 left-4 text-white font-bold text-xl bg-opacity-75 bg-black p-2 rounded-lg'>
                                    {d.name}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default Slider;
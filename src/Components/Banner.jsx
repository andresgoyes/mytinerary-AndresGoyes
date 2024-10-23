import React from 'react';

const Banner = () => {
    return (
        <div className="w-full relative overflow-hidden" style={{ height: 'calc(65vh - 4rem)' }}>
            <img
                src="/images/new-york.jpg"
                alt="Explore"
                className="w-full h-full object-cover absolute object-center brightness-[.55] shadow-lg animate-zoom"
            />
            
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center md:w-5/12 gap-6 xs:gap-12 p-8 rounded-lg shadow-xl z-20">                        
                    <div className="font-bold text-slate-100 text-3xl sm:text-4xl text-center shadow-md">
                        Cities
                    </div>                        
                    <div className="text-slate-100 text-2xl mx-auto text-center shadow-md">
                        Choose the city, and we'll take care of the rest.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
'use client'

import React from 'react';
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

const Carousel: React.FC = () => {
    return (
        <div>
            <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-7.5">
                <h1 className="text-3xl font-bold">Welcome to our electronics store</h1>
            </div>

            <div className="p-4 sm:p-6 xl:p-10">
                <Swiper
                    className="carouselTwo"
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    <SwiperSlide>
                        <img className='w-full h-[450px]'
                            src="https://www.lg.com/levant_en/images/plp-b2c/levanten-mobilephones-hero-1-d.jpg"
                            alt="iPhone 15 Pro Max"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full h-[450px]'
                            src="https://5.imimg.com/data5/AX/DR/AB/SELLER-9561275/interactive-graphic-design-service-1000x1000.jpg"
                            alt="iPhone 15 Pro Max"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full h-[450px]'
                            src="https://5.imimg.com/data5/MF/AD/OO/SELLER-9561275/interactive-graphic-design-service-1000x1000.jpg"
                            alt="iPhone 15 Pro Max"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Carousel;
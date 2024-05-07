'use client'

import React from 'react';
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import Image from 'next/image'; // Importamos Image de next/image

const Carousel: React.FC = () => {
    return (
        <div>
            <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-7.5">
                <h1 className="text-3xl font-bold">Bienvenido a nuestra tienda de electrónica</h1>
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
                        <Image // Reemplazamos <img> con <Image />
                            src="https://www.lg.com/levant_en/images/plp-b2c/levanten-mobilephones-hero-1-d.jpg"
                            alt="iPhone 15 Pro Max"
                            width={1200} // Ajusta el ancho de la imagen según tus necesidades
                            height={450} // Ajusta la altura de la imagen según tus necesidades
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image // Reemplazamos <img> con <Image />
                            src="https://5.imimg.com/data5/AX/DR/AB/SELLER-9561275/interactive-graphic-design-service-1000x1000.jpg"
                            alt="iPhone 15 Pro Max"
                            width={1200} // Ajusta el ancho de la imagen según tus necesidades
                            height={450} // Ajusta la altura de la imagen según tus necesidades
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image // Reemplazamos <img> con <Image />
                            src="https://5.imimg.com/data5/MF/AD/OO/SELLER-9561275/interactive-graphic-design-service-1000x1000.jpg"
                            alt="iPhone 15 Pro Max"
                            width={1200} // Ajusta el ancho de la imagen según tus necesidades
                            height={450} // Ajusta la altura de la imagen según tus necesidades
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Carousel;

'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import slider1 from '../../../../assets/images/slider-image-1.jpeg'
import slider2 from '../../../../assets/images/slider-image-2.jpeg'
import slider3 from '../../../../assets/images/slider-image-3.jpeg'
import blog1 from '../../../../assets/images/blog-img-1.jpeg'
import blog2 from '../../../../assets/images/blog-img-2.jpeg'
import Image from 'next/image';

export default function Slider() {
    return (
        <div className='lg:flex hidden'>
            <div className='w-3/4'>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}

                >
                    <SwiperSlide>
                        <Image src={slider1} alt='' className='h-[400px] object-cover' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={slider2} alt='' className='w-full h-[400px] object-cover' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={slider3} alt='' className='w-full h-[400px] object-cover' />
                    </SwiperSlide>


                </Swiper>
            </div>
            <div className='w-1/4'>
                <Image src={blog1} alt='' className='h-[200px] object-cover' />
                <Image src={blog2} alt='' className='h-[200px] object-cover' />
            </div>
        </div>
    )
}

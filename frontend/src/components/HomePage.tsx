import {FC} from 'react';
import Header from './UI-HomePage/Header/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import "../style.scss";
import 'swiper/scss';
import 'swiper/scss/pagination';
import { Pagination } from 'swiper/modules';
import sliderImage from '../assets/slider-image.jpg';




const HomePage:FC = () => {



    return ( 

        <div className='wrapper'>
            <Header></Header>
            <div className="swiper__container">
            <Swiper
                pagination={{
                dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper swiper"
            >
                <SwiperSlide className='slider__image'>
                    <img  src={sliderImage} alt="" />
                </SwiperSlide>
                <SwiperSlide className='slider__image'>
                    <img src={sliderImage} alt="" />
                </SwiperSlide>
                <SwiperSlide className='slider__image'>
                    <img src={sliderImage} alt="" />
                </SwiperSlide>
            </Swiper>
            </div>
        </div>
     );
}

export default HomePage;
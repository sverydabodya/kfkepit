import {FC} from 'react';
import Header from './UI-HomePage/Header/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/pagination';
import "../style.scss";
import { Pagination } from 'swiper/modules';
import sliderImage from '../assets/slider-image.jpg';
import Footer from './UI/Footer/Footer';




const HomePage:FC = () => {



    return ( 

        <div className='wrapper'>
            <Header></Header>
            <main className="page">
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
            </main>
            <Footer></Footer>
        </div>
     );
}

export default HomePage;
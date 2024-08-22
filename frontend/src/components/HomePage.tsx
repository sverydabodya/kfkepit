import {FC} from 'react';
import Header from './UI-HomePage/Header/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/pagination';
import "../style.scss";
import classes from './UI-HomePage/HomePage.module.scss'
import { Pagination } from 'swiper/modules';
import sliderImage from '../assets/slider-image.jpg';
import cardImage from '../assets/card.jpg'
import Footer from './UI/Footer/Footer';




const HomePage:FC = () => {



    return ( 

        <div className={classes.wrapper}>
            <Header></Header>
            <main className={classes.page}>
                <div className="swiper__container">
                    <Swiper
                        pagination={{
                        dynamicBullets: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper swiper"
                    >
                        <SwiperSlide className='slider__image'>
                            <img  src={sliderImage} alt="slider image" />
                        </SwiperSlide>
                        <SwiperSlide className='slider__image'>
                            <img src={sliderImage} alt="slider image" />
                        </SwiperSlide>
                        <SwiperSlide className='slider__image'>
                            <img src={sliderImage} alt="slider image" />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <section className={classes.page__edu}>
                    <h2 className={classes.management__title}>Адміністрація коледжу</h2>
                    <div className={classes.management__cards}>
                        <div className={classes.management__card}>
								<img
									src={cardImage}
									alt=""
									className={classes.management__img}
								/>
								<div className={classes.management__name}>
									Тимків<br />
									Ганна Ярославівна
								</div>
								<p className={classes.management__label}>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit.
									Accusamus, fuga?
								</p>
								<span className={classes.overlay}></span>
						</div>
                        <div className={classes.management__card}>
								<img
									src={cardImage}
									alt=""
									className={classes.management__img}
								/>
								<div className={classes.management__name}>
									Тимків<br />
									Ганна Ярославівна
								</div>
								<p className={classes.management__label}>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit.
									Accusamus, fuga?
								</p>
								<span className={classes.overlay}></span>
						</div>    
                        <div className={classes.management__card}>
								<img
									src={cardImage}
									alt=""
									className={classes.management__img}
								/>
								<div className={classes.management__name}>
									Тимків<br />
									Ганна Ярославівна
								</div>
								<p className={classes.management__label}>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit.
									Accusamus, fuga?
								</p>
								<span className={classes.overlay}></span>
						</div>    
                        <div className={classes.management__card}>
								<img
									src={cardImage}
									alt=""
									className={classes.management__img}
								/>
								<div className={classes.management__name}>
									Тимків<br />
									Ганна Ярославівна
								</div>
								<p className={classes.management__label}>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit.
									Accusamus, fuga?
								</p>
								<span className={classes.overlay}></span>
						</div>                            
                    </div>
                </section>
            </main>
            <Footer className='footer'></Footer>
        </div>
     );
}

export default HomePage;
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
import { motion } from 'framer-motion';




const HomePage:FC = () => {



    return ( 

        <div className={classes.wrapper}>
            <Header/>
            <main className={classes.page}>
                <motion.div className="swiper__container"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}>
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
                </motion.div>
                <section className={classes.page__edu}>
                    <motion.h1 className={classes.management__title}
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					>Адміністрація коледжу</motion.h1>
                    <motion.div className={classes.management__cards}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}>
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
                    </motion.div>
                </section>
            </main>
            <Footer className='footer'></Footer>
        </div>
     );
}

export default HomePage;
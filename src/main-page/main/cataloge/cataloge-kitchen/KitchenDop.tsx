import { FC } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

interface KitchenDopProps { }

export const KitchenDop: FC<KitchenDopProps> = () => {
    return <section className="main-kitchen-dop kitchen-dop">
        <Swiper
            className="kitchen-dop__swiper"
            // loop={true}
            grabCursor={true}
            slidesPerView={"auto"}
            spaceBetween={15}
        >
            <SwiperSlide className="category__list swiper-slide">
                <Link to={"/kitchen"} className="category__link">МОДУЛЬНЫЕ КУХНИ</Link>
            </SwiperSlide>
            <SwiperSlide className="category__list swiper-slide">
                <Link to={"/kitchen"} className="category__link">ГОТОВЫЕ КОМПЛЕКТЫ</Link>
            </SwiperSlide>
            <SwiperSlide className="category__list swiper-slide">
                <Link to={"/kitchen"} className="category__link">МАЛЕНЬКИЕ КУХНИ</Link>
            </SwiperSlide>
            <SwiperSlide className="category__list swiper-slide">
                <Link to={"/kitchen"} className="category__link">УГЛОВЫЕ КУХНИ</Link>
            </SwiperSlide>
            <SwiperSlide className="category__list swiper-slide">
                <Link to={"/kitchen"} className="category__link">КУХОННЫЕ УГОЛКИ</Link>
            </SwiperSlide>
            <SwiperSlide className="category__list swiper-slide">
                <Link to={"/kitchen"} className="category__link">СТОЛЫ КУХОННЫЕ</Link>
            </SwiperSlide>
            <SwiperSlide className="category__list swiper-slide">
                <Link to={"/kitchen"} className="category__link">СТУЛЬЯ ДЛЯ КУХНИ</Link>
            </SwiperSlide>
            <SwiperSlide className="category__list swiper-slide">
                <Link to={"/kitchen"} className="category__link">КОМПЛЕКТУЮЩИЕ</Link>
            </SwiperSlide>
        </Swiper>
    </section>
}
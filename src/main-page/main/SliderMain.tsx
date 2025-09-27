import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import slide1 from "../../img/slide/slide1.jpg";
import slide2 from "../../img/slide/slide2.jpg";
import slide3 from "../../img/slide/slide3.jpg";

export const SliderMain: FC = () => {
    const slidersMain = [slide1, slide2, slide3];

    return <section className="main-slider">
        <div className="slider__container">
            <Swiper
                modules={[EffectFade, Autoplay, Pagination]}
                direction="horizontal"
                loop={true}
                speed={2000}
                spaceBetween={0}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                // grabCursor={true}
                allowTouchMove={false}
                simulateTouch={false}
                autoplay={{ delay: 5000 }}
                breakpoints={{
                    320: {
                        pagination: {
                            el: '.slider__pagination',
                            dynamicBullets: true,
                            type: 'bullets',
                        },
                    },
                    991: {
                        pagination: false,
                    },
                }}
                className="swiper-wrapper slider__wrapper"
            >
                {slidersMain.map((s, index) => (
                    <SwiperSlide key={index} className="swiper-slide slider__slide">
                        <img src={s} alt={`Slide ${index + 1}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </section>
}
import { FC } from "react";
import ProductCard from "../../PopProductHOC";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

interface KitchenActionProps { kitchen: any }

export const KitchenAction: FC<KitchenActionProps> = ({ kitchen }) => {

    return <section className="main-action action">
        <div className="action__container">
            <h2 className="action__title page-title"><a href="">ПОПУЛЯРНЫЕ ТОВАРЫ ЭТОЙ КАТЕГОРИИ</a></h2>
        </div>
        <Swiper
            modules={[Pagination, Navigation]}
            loop={false}
            speed={500}
            spaceBetween={30}
            slidesPerView={4}
            grabCursor={true}
            navigation={{
                nextEl: ".action__button-next",
                prevEl: ".action__button-prev"
            }}
            className="action__slider"
        >
            {kitchen?.map((kitch: any) => (
                <SwiperSlide className="action__slide" key={kitch.id}>
                    <ProductCard
                        key={kitch.id}
                        id={kitch.id}
                        name={kitch.name}
                        price={kitch.price}
                        oldPrice={kitch.oldPrice}
                        product={kitch.product}
                        horizontal={true}
                        maxStroke={1}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    </section>
}
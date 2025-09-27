import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, } from "swiper/modules";
import ProductCard from "./PopProductHOC";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useCard } from "../../hooks/cardHook";
import { Link } from "react-router-dom";
import Loader from "../../customLoader/CustomLoader";
import { fetchProductToFirestore } from "../../redux/thunks/productThunks";

export const Action: FC<{ actionComponent?: boolean }> = ({ actionComponent }) => {
    const { cards, isLoading } = useCard()
    const [loadingCard, setLoadingCards] = useState<number>(8)

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchProductToFirestore())
    }, [dispatch])
    const loadMoreCards = () => {
        setLoadingCards((prev) => prev + 4)
    }
    const hideMoreCards = (hideTo: number) => {
        setLoadingCards(hideTo)
    }
    return <section className="main-action action">
        <div className="action__container">
            <h2 className="action__title page-title"><Link to={"/action"}>{actionComponent ? "АКЦИИ" : "ТОВАРЫ ПО АКЦИИ"}</Link></h2>
            {actionComponent
                ? <div className="action__items product__items">{isLoading === false ? cards?.slice(0, loadingCard).map((card: any, index: any) => (
                    <ProductCard
                        id={card.id}
                        name={card.name}
                        price={card.price}
                        oldPrice={card.oldPrice}
                        discount={card.discount}
                        sizes={card.sizes}
                        product={card.product}
                        hit={card.hit}
                        key={index}
                    // horizontal={true}
                    />
                )) : <Loader />}
                </div>
                : <><Swiper
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
                    {isLoading === false
                        ? cards?.map((card: any, index: any) => (
                            <SwiperSlide className="action__slide" key={index}>
                                <ProductCard
                                    id={card.id}
                                    name={card.name}
                                    price={card.price}
                                    oldPrice={card.oldPrice}
                                    discount={card.discount}
                                    sizes={card.sizes}
                                    product={card.product}
                                    hit={card.hit}
                                    horizontal={true}
                                />
                            </SwiperSlide>
                        ))
                        : <Loader />}
                </Swiper>
                    <div className="action__navigation">
                        <div className="swiper-button-next action__button-next"></div>
                        <div className="swiper-button-prev action__button-prev"></div>
                    </div>
                </>
            }
            {actionComponent === true &&
                <>
                    {cards && loadingCard < cards.length ?
                        <button onClick={() => loadMoreCards()} className="product__load">
                            <span>Показать еще</span>
                        </button>
                        : <button onClick={() => hideMoreCards(8)} className="product__load">
                            <span>Скрыть</span>
                        </button>}
                </>
            }

        </div>
    </section>
}
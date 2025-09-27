import { FC, useRef, useState } from "react"

import location from "../../img/icons/location.svg"
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react"
import { EffectFade, Thumbs } from "swiper/modules"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface WishlistItem {
    id: string | number;
    name: string;
    price: string;
    link: string;
    image: string;
}

interface MainProductCardProps {
    id: number;
    name: string;
    price: string;
    oldPrice?: string;
    discount?: string;
    hit?: boolean;
    product?: any;
    sizes?: { width: string; height: string; depth: string };
    activeColorState?: string | null;
    changeActiveColor: (color: string) => void;
    material: any,
    characteristics?: any,
    currentProduct: any,
    handleAddToCart: (product: any) => void,
    isWishlistId: (name: string, id: string | number) => boolean;
    handleAddToWishlist: (item: WishlistItem) => void;
}

export const MainProductCard: FC<MainProductCardProps> = ({
    id,
    name,
    price,
    oldPrice,
    discount,
    product,
    activeColorState,
    changeActiveColor,
    material,
    characteristics,
    currentProduct,
    handleAddToCart,
    isWishlistId, handleAddToWishlist
}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [activeCharact, setActiveCharact] = useState<boolean>(false)
    const imagesForColor = product?.color?.[activeColorState || ""]?.images || [];
    const mainSwiperRef = useRef<SwiperClass | null>(null);
    const commentItems = useSelector((state: RootState) => state.comment.items)
    const filteredComments = commentItems.filter(
        (item) => item.productId === id
    );
    const getAverageRating = (reviews: { stars: number }[]) => {
        if (!reviews.length) return 0;
        const total = reviews.reduce((sum, review) => sum + review.stars, 0);
        return total / reviews.length;
    };
    const averageRating = getAverageRating(filteredComments);



    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const fractional = rating - fullStars;
        const stars = [];

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<span key={i} className="star full">★</span>);
            } else if (i === fullStars && fractional > 0) {
                stars.push(
                    <span key={i} className="star partial">
                        <span style={{ width: `${fractional * 100}%` }}>★</span>
                        <span>★</span>
                    </span>
                );
            } else {
                stars.push(<span key={i} className="star empty">★</span>);
            }
        }

        return stars;
    };
    return <section className="main-product-card product-card">
        <div className="product-card__container">
            <div className="product-card__content">
                <Swiper
                    onSwiper={(swiper: any) => (mainSwiperRef.current = swiper)} // устанавливаем ссылку на swiper instance
                    modules={[EffectFade, Thumbs]}
                    effect="fade"
                    grabCursor={true}
                    direction="horizontal"
                    className="product-card__slider"
                    thumbs={{ swiper: thumbsSwiper }}
                >
                    {Object.entries(imagesForColor).map(([color, images]: any, index) =>
                    (<SwiperSlide key={index} className="product-card__slide swiper-slide">
                        <img src={images} alt="" className="product-card__slide-img" />
                    </SwiperSlide>))}
                </Swiper>
                <Swiper
                    modules={[Thumbs]}
                    onSwiper={setThumbsSwiper}  // Запоминаем сюда экземпляр мини-слайдера
                    slidesPerView={4}
                    spaceBetween={10}
                    grabCursor={true}
                    watchSlidesProgress={true}
                    className="product-card__slider-mini"
                >
                    {Object.entries(imagesForColor).map(([color, images]: any, index) => (
                        <SwiperSlide key={index} className="product-card__slide-mini">
                            <img src={images} alt="" className="product-card__slide-img" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="product-card__body product-card-body">
                <div className="product-card-body__title">
                    <h2 className="product-card-body__name page-title">
                        {name}
                    </h2>
                    <div className="product-card-body__score-box">
                        <div className="product-rating">
                            {renderStars(averageRating)}
                            <span className="rating-value">{averageRating.toFixed(1)}</span>
                        </div>
                        <div className="product-card-body__review">{filteredComments.length} отзывов</div>
                    </div>
                </div>
                <div className="product-card-body__cost">
                    <div className="product-card-body__cost-trought">{oldPrice}</div>
                    <div className="product-card-body__cost-main">{price}</div>
                    <span className="product__action-eco"><span>{discount}</span></span>
                </div>
                <div className="product-card-body__dop">
                    <div className="product-card-body__stock">В наличии</div>
                    <div className="product-card-body__installments">Рассрочка 0-0-6</div>
                </div>
                <div className="product-card-body__action">
                    <div className="product-card-body__action-main">
                        <button
                            onClick={() => {
                                handleAddToCart({
                                    id: currentProduct.id,
                                    name: currentProduct.name,
                                    price: currentProduct.price,
                                    image: imagesForColor?.[0] || "",
                                    quantity: 1
                                })
                            }} className="product-card-body__action-btn product-card-body__action-buy">КУПИТЬ</button>
                        <button
                            onClick={() => handleAddToWishlist({
                                id, name, price, link: `/product/${id}`, image: imagesForColor?.[0] || ""
                            })}
                            className="popular__button-favorite product__button-favorite"
                            data-tooltip={
                                isWishlistId(name, id)
                                    ? "Удалить из избранного"
                                    : "Добавить в избранное"
                            }
                        >
                            <img src={isWishlistId(name, id)
                                ? "https://img.icons8.com/win10/512w/FA5252/filled-heart.png"
                                : "https://www.svgrepo.com/show/391884/heart-empty.svg"} alt="Add to favorite" />
                        </button>
                    </div>
                    <button className="product-card-body__action-btn product-card-body__action-project">СДЕЛАТЬ
                        ПРОЕКТ И ПРОСЧЕТ</button>
                    <button className="product-card-body__action-btn product-card-body__action-location"><img src={location}
                        alt="" /> <span>ГДЕ
                            ПОСМОТРЕТЬ</span></button>

                </div>
                <div className="product-card-body__colors">
                    <h4 className="product-card-body__colors-title">Цвета фасадов:</h4>
                    <div className="product-card-body__colors-color">
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={10}
                            grabCursor={true}
                            watchSlidesProgress={true}
                            className="product-card-body__slider-colors"
                            style={{ margin: "0px" }}
                        >
                            {product?.color && Object.keys(product.color).map((c: string, index) => (
                                <SwiperSlide key={index} className="product-card-body__slide-color"
                                    style={{
                                        backgroundColor: c,
                                        border: c === activeColorState ? "1px solid green" : "none",

                                    }}>
                                    <div
                                        onClick={() => {
                                            changeActiveColor(c);
                                            mainSwiperRef.current?.slideTo(0);
                                        }}
                                        className="product-card-body__slide-color-btn"
                                    ></div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="product-card-body__features">
                    <h4 className="product-card-body__features-title">ХАРАКТЕРИСТИКИ</h4>
                    <div className="product-card-body__features-items">
                        <div className="product-card-body__features-item">
                            <div className="product-card-body__features-category">Высота нижних шкафов:</div>
                            <div className="product-card-body__features-info">{characteristics?.heightLC}</div>
                        </div>
                        <div className="product-card-body__features-item">
                            <div className="product-card-body__features-category">Высота верхних шкафов:</div>
                            <div className="product-card-body__features-info">{characteristics?.heightUC}</div>

                        </div>
                        {activeCharact === true && <div className="product-card-body__item-hiden">
                            <div className="product-card-body__features-item">
                                <div className="product-card-body__features-category">Глубина нижних шкафов:
                                </div>
                                <div className="product-card-body__features-info">{characteristics?.depthLC}</div>
                            </div>
                            <div className="product-card-body__features-item">
                                <div className="product-card-body__features-category">Глубина верхних шкафов:
                                </div>
                                <div className="product-card-body__features-info">{characteristics?.depthUC}</div>
                            </div>
                            <div className="product-card-body__features-item">
                                <div className="product-card-body__features-category">Материал фасада:</div>
                                <div className="product-card-body__features-info">{material.facade}</div>
                            </div>
                            <div className="product-card-body__features-item">
                                <div className="product-card-body__features-category">Материал корпуса:</div>
                                <div className="product-card-body__features-info">{material.hull}</div>
                            </div>
                            <div className="product-card-body__features-item">
                                <div className="product-card-body__features-category">Направляющие:</div>
                                <div className="product-card-body__features-info">{material.guides}</div>
                            </div>
                            <div className="product-card-body__features-item">
                                <div className="product-card-body__features-category">Столешница:</div>
                                <div className="product-card-body__features-info">{material.tabletop}</div>
                            </div>
                            <div className="product-card-body__features-item">
                                <div className="product-card-body__features-category">Стекло:</div>
                                <div className="product-card-body__features-info">{material.glass}</div>
                            </div>
                            <div className="product-card-body__features-item">
                                <div className="product-card-body__features-category">Фурнитура:</div>
                                <div className="product-card-body__features-info">{material.fittings}</div>
                            </div>
                            <div className="product-card-body__features-item">
                                <div className="product-card-body__features-category">Ручки:</div>
                                <div className="product-card-body__features-info">{material.knobs}</div>
                            </div>
                        </div>}
                        <button className="product-card-body__features-btn" onClick={() => setActiveCharact(!activeCharact)}>
                            {activeCharact ? "Скрыть" : "Показать все"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section >
}
import { FC, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { EffectFade, Thumbs } from "swiper/modules";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import location from "../../img/icons/location.svg";

interface WishlistItem {
    id: string | number;
    name: string;
    price: number;
    link: string;
    image: string;
}

interface Color {
    id: string;
    hex: string;
    name: string;
    images: string[];
    thumbnail: string;
}

interface Material {
    facade: string;
    hull: string;
    guides: string;
    tabletop: string;
    glass: string;
    fittings: string;
    knobs: string;
}

interface Characteristics {
    heightLC?: string;
    heightUC?: string;
    depthLC?: string;
    depthUC?: string;
}

interface MainProductCardProps {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    discountPercent?: number;
    hit?: boolean;
    product?: { colors: Color[] };
    sizes?: { width: string; height: string; depth: string };
    activeColorState?: string | null;
    changeActiveColor: (color: string) => void;
    material: Material;
    characteristics?: Characteristics;
    currentProduct: any;
    handleAddToCart: (product: any) => void;
    isWishlistId: (name: string, id: string | number) => boolean;
    handleAddToWishlist: any;
    formatPrice: any
}

export const MainProductCard: FC<MainProductCardProps> = ({
    id,
    name,
    price,
    oldPrice,
    discountPercent,
    product,
    activeColorState,
    changeActiveColor,
    material,
    characteristics,
    currentProduct,
    handleAddToCart,
    isWishlistId,
    handleAddToWishlist,
    formatPrice
}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [activeCharact, setActiveCharact] = useState(false);
    const mainSwiperRef = useRef<SwiperClass | null>(null);

    const activeColor =
        product?.colors?.find((c) => c.hex === activeColorState) ||
        product?.colors?.[0];
    const imagesForColor = activeColor?.images || [];
    const thumbnailForColor = activeColor?.thumbnail || "";

    const commentItems = useSelector((state: RootState) => state.comment.items);
    const filteredComments = commentItems.filter((item) => item.productId === id);

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
                stars.push(
                    <span key={i} className="star full">
                        ★
                    </span>
                );
            } else if (i === fullStars && fractional > 0) {
                stars.push(
                    <span key={i} className="star partial">
                        <span style={{ width: `${fractional * 100}%` }}>★</span>
                        <span>★</span>
                    </span>
                );
            } else {
                stars.push(
                    <span key={i} className="star empty">
                        ★
                    </span>
                );
            }
        }

        return stars;
    };

    return (
        <section className="main-product-card product-card">
            <div className="product-card__container">
                <div className="product-card__content">
                    <Swiper
                        onSwiper={(swiper: any) => (mainSwiperRef.current = swiper)}
                        modules={[EffectFade, Thumbs]}
                        effect="fade"
                        grabCursor={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        className="product-card__slider"
                    >
                        {imagesForColor.map((img, index) => (
                            <SwiperSlide key={index} className="product-card__slide swiper-slide">
                                <img src={img} alt="" className="product-card__slide-img" />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <Swiper
                        modules={[Thumbs]}
                        onSwiper={setThumbsSwiper}
                        slidesPerView={4}
                        spaceBetween={10}
                        grabCursor={true}
                        watchSlidesProgress={true}
                        className="product-card__slider-mini"
                    >
                        {imagesForColor.map((img, index) => (
                            <SwiperSlide key={index} className="product-card__slide-mini">
                                <img src={img} alt="" className="product-card__slide-img" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="product-card__body product-card-body">
                    <div className="product-card-body__title">
                        <h2 className="product-card-body__name page-title">{name}</h2>
                        <div className="product-card-body__score-box">
                            <div className="product-rating">
                                {renderStars(averageRating)}
                                <span className="rating-value">{averageRating.toFixed(1)}</span>
                            </div>
                            <div className="product-card-body__review">{filteredComments.length} отзывов</div>
                        </div>
                    </div>

                    <div className="product-card-body__cost">
                        <div className="product-card-body__cost-trought">{formatPrice(oldPrice)}</div>
                        <div className="product-card-body__cost-main">{formatPrice(price)}</div>
                        {discountPercent && (
                            <span className="product__action-eco">
                                <span>{discountPercent}%</span>
                            </span>
                        )}
                    </div>

                    <div className="product-card-body__dop">
                        <div className="product-card-body__stock">В наличии</div>
                        <div className="product-card-body__installments">Рассрочка 0-0-6</div>
                    </div>

                    <div className="product-card-body__action">
                        <div className="product-card-body__action-main">
                            <button
                                className="product-card-body__action-btn product-card-body__action-buy"
                                onClick={() =>
                                    handleAddToCart({
                                        id: currentProduct.id,
                                        name: currentProduct.name,
                                        price: currentProduct.price,
                                        image: thumbnailForColor,
                                        quantity: 1,
                                    })
                                }
                            >
                                КУПИТЬ
                            </button>

                            <button
                                className="popular__button-favorite product__button-favorite"
                                data-tooltip={
                                    isWishlistId(name, id)
                                        ? "Удалить из избранного"
                                        : "Добавить в избранное"
                                }
                                onClick={() =>
                                    handleAddToWishlist({
                                        id,
                                        name,
                                        price,
                                        link: `/product/${id}`,
                                        image: thumbnailForColor,
                                    })
                                }
                            >
                                <img
                                    src={
                                        isWishlistId(name, id)
                                            ? "https://img.icons8.com/win10/512w/FA5252/filled-heart.png"
                                            : "https://www.svgrepo.com/show/391884/heart-empty.svg"
                                    }
                                    alt="Add to favorite"
                                />
                            </button>
                        </div>

                        <button className="product-card-body__action-btn product-card-body__action-project">
                            СДЕЛАТЬ ПРОЕКТ И ПРОСЧЕТ
                        </button>

                        <button className="product-card-body__action-btn product-card-body__action-location">
                            <img src={location} alt="" />
                            <span>ГДЕ ПОСМОТРЕТЬ</span>
                        </button>
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
                            >
                                {product?.colors?.map((c, index) => (
                                    <SwiperSlide
                                        key={index}
                                        className="product-card-body__slide-color"
                                        style={{
                                            backgroundColor: c.hex,
                                            border: c.hex === activeColorState ? "2px solid green" : "none",
                                        }}
                                    >
                                        <div
                                            className="product-card-body__slide-color-btn"
                                            onClick={() => {
                                                changeActiveColor(c.hex);
                                                mainSwiperRef.current?.slideTo(0);
                                            }}></div>
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

                            {activeCharact && (
                                <div className="product-card-body__item-hiden">
                                    <div className="product-card-body__features-item">
                                        <div className="product-card-body__features-category">Глубина нижних шкафов:</div>
                                        <div className="product-card-body__features-info">{characteristics?.depthLC}</div>
                                    </div>
                                    <div className="product-card-body__features-item">
                                        <div className="product-card-body__features-category">Глубина верхних шкафов:</div>
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
                                </div>
                            )}
                            <button
                                className="product-card-body__features-btn"
                                onClick={() => setActiveCharact(!activeCharact)}
                            >
                                {activeCharact ? "Скрыть" : "Показать все"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

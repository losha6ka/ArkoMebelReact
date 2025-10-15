import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { addActiveColor } from "../../redux/reducers/cardReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useWishlist } from "../../hooks/useWishlist";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    discount?: number;
    hit?: boolean;
    sizes?: { width: string; height: string; depth: string };
    product?: any;
    horizontal?: boolean;
    maxStroke?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    price,
    oldPrice,
    discount,
    sizes,
    hit,
    product,
    horizontal,
    maxStroke
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [activeColorIndex, setActiveColorIndex] = useState(0);
    const swiperRef = useRef<any>(null);
    const { isWishlistId, handleAddToWishlist } = useWishlist();

    const handleNewColor = (index: number) => {
        setActiveColorIndex(index);
        swiperRef.current?.slideTo(index);
        dispatch(addActiveColor(product?.colors?.[index]?.hex));
    };

    const formatPrice = (raw?: string | number | null) => {
        if (raw == null) return "";
        const s = String(raw).replace(/[^0-9]/g, "");
        if (!s) return "";
        const withSpaces = s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return `${withSpaces} грн.`;
    };

    useEffect(() => {
        swiperRef.current?.slideTo(activeColorIndex);
    }, [activeColorIndex]);

    return (
        <div className={horizontal ? "popular__item product__item action__slide-item" : "popular__item product__item"}>
            <div className="popular__action product__action">
                {discount && (
                    <span className="popular__action-eco product__action-eco active">
                        <span>{discount}</span>
                    </span>
                )}
                {hit && (<span className="popular__action-dop product__action-dop active">ХИТ</span>)}
            </div>
            <div className="popular__item-box product__item-box">
                <Swiper
                    modules={[EffectFade]}
                    observer={true}
                    observeParents={true}
                    direction={"horizontal"}
                    speed={500}
                    spaceBetween={30}
                    effect={"fade"}
                    allowTouchMove={false}
                    loop={true}
                    simulateTouch={false}
                    fadeEffect={{ crossFade: true }}
                    onSwiper={(swiper: any) => {
                        swiperRef.current = swiper;
                    }}
                    className="swiper popular__slider product__slider"
                >
                    {product?.colors?.map((colorData: any, index: number) => (
                        <SwiperSlide key={index} className="popular__slide product__slide">
                            <Link to={`/product/${id}`}>
                                <img src={colorData.images[0]} alt={`Product color ${colorData.name}`} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div style={maxStroke ? {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: maxStroke,
                    WebkitBoxOrient: "vertical"
                } : undefined}
                    className="popular__name product__name">
                    <Link to={`/product/${id}`}>{name}</Link>
                </div>
                <div className="popular__pagination-color product__pagination-color">
                    {product?.colors?.map((c: any, index: number) => (
                        <span
                            onClick={() => handleNewColor(index)}
                            style={{
                                backgroundColor: c.hex,
                                transform: index === activeColorIndex ? "scale(1.1)" : "scale(1)",
                                border: index === activeColorIndex ? "1px solid #384685" : "none",
                                cursor: "pointer"
                            }}
                            key={index}
                        ></span>
                    ))}
                </div>
                <div className="popular__cost product__cost">
                    {oldPrice && <span className="popular__cost-trought product__cost-trought">{formatPrice(oldPrice)}</span>}
                    {formatPrice(price)}
                </div>
                {sizes && (
                    <div className="popular__dopinfo-hiden product__dopinfo-hiden">
                        <div className="product__dopinfo-hiden-title">Ш*Г*В:</div>
                        <div className="product__dopinfo-hiden-siz">
                            {sizes.width}*{sizes.depth}*{sizes.height}
                        </div>
                    </div>
                )}
                <div className="popular__actions product__actions">
                    <button style={{ background: "none" }}>
                        <Link className="popular__button-buy product__button-buy" to={`/product/${id}`}>КУПИТЬ</Link>
                    </button>
                    <button
                        onClick={() => handleAddToWishlist({
                            id, name, price, link: `/product/${id}`, image: product?.colors?.[activeColorIndex]?.images?.[0] || ""
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
            </div>
        </div>
    );
};

export default ProductCard;

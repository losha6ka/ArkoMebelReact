import { FC, useState } from "react";
import payship1 from "../../img/payship/01.svg"
import payship2 from "../../img/payship/02.svg"
import payship3 from "../../img/payship/03.svg"
import payship4 from "../../img/payship/04.svg"
import { MainReviews } from "./MainReviews";
import { Reviews } from "./Reviews";
interface WishlistItem {
    id: string;
    name: string;
    price: number;
    link: string;
    image: string;
}
interface MainExtraProps {
    uid: any,
    id: string,
    module?: any,
    table?: any,
    feedback?: any,
    description?: any,
    handleAddToCart: any,
    isWishlistId: (name: string, id: string) => boolean;
    handleAddToWishlist: (item: WishlistItem) => void;
}

export const MainExtra: FC<MainExtraProps> = ({
    uid, id,
    module, table,
    feedback, description,
    handleAddToCart,
    isWishlistId, handleAddToWishlist
}) => {
    const [activeFilters, setActiveFilters] = useState<string>("ДОСТУПНЫЕ МОДУЛИ")
    const filters = {
        module: "ДОСТУПНЫЕ МОДУЛИ",
        tables: "ВАРИАНТЫ СТОЛЕШНИЦ",
        reviews: "ОТЗЫВЫ",
        description: "ОПИСАНИЕ",
        delivery: "ДОСТАВКА И ОПЛАТА",
    }
    const handleActiveFilters = (filter: string) => {
        setActiveFilters(filter)
    }
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
    }

    return <section className="main-extra extra">
        <div className="extra__container">
            <div className="extra__filters filters-extra">
                {Object.entries(filters).map(([key, value]) => (
                    <button
                        onClick={() => handleActiveFilters(value)} key={key}
                        className={value === activeFilters ? "filters-extra__btn active" : "filters-extra__btn"}>
                        {value}
                    </button>
                ))}
            </div>
            {activeFilters === filters.module ? (<div className="extra__content">
                <div className="extra__body">
                    <div className="extra__content">
                        <div className="extra__body">
                            <div className="extra__items  product__items">
                                {module?.map((m: any) => (
                                    <div className="extra__item  product__item" key={m.id}>
                                        <div className="product__action ">
                                            {m.discount && <span className="product__action-eco"><span>{m.discount}</span></span>}
                                        </div>
                                        <div className="extra__img">
                                            <img src={m.img} alt="" />
                                        </div>
                                        <div className="product__name">{m.name}</div>
                                        <div className="product__cost">
                                            <span className="product__cost-trought">{m.oldPrice}</span>
                                            {m.price}
                                        </div>
                                        <div className="product__actions">
                                            <button
                                                onClick={() => handleAddToCart({
                                                    id: `${m.name}-${m.id}`,
                                                    name: m.name,
                                                    price: m.price,
                                                    image: m.img || "",
                                                    quantity: 1
                                                })}
                                                className="product__button-buy">ДОБАВИТЬ</button>
                                            <button
                                                onClick={() => handleAddToWishlist({
                                                    id: m.id,
                                                    name: m.name,
                                                    price: m.price,
                                                    link: `/product/${m.id}`,
                                                    image: m.img,
                                                })}
                                                className="popular__button-favorite product__button-favorite"
                                                data-tooltip={
                                                    isWishlistId(m.name, m.id)
                                                        ? "Удалить из избранного"
                                                        : "Добавить в избранное"
                                                }
                                            >
                                                <img src={isWishlistId(m.name, m.id)
                                                    ? "https://img.icons8.com/win10/512w/FA5252/filled-heart.png"
                                                    : "https://www.svgrepo.com/show/391884/heart-empty.svg"} alt="Add to favorite" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
                : activeFilters === filters.tables ? (<div className="extra__content">
                    <div className="extra__body">
                        <div className="extra__content">
                            <div className="extra__body">
                                <div className="extra__items  product__items">
                                    {table?.map((t: any) => (
                                        <div className="extra__item  product__item" key={t.id}>
                                            <div className="product__action ">
                                                {t.discount && <span className="product__action-eco"><span>{t.discount}</span></span>}
                                            </div>
                                            <div className="extra__img">
                                                <img src={t.img} alt="" />
                                            </div>
                                            <div className="product__name">{t.name}</div>
                                            <div className="product__cost">
                                                <span className="product__cost-trought">{t.oldPrice}</span>
                                                {t.price}
                                            </div>
                                            <div className="product__actions">
                                                <button
                                                    onClick={() => handleAddToCart({
                                                        id: `${t.name}-${t.id}`,
                                                        name: t.name,
                                                        price: t.price,
                                                        image: t.img || "",
                                                        quantity: 1
                                                    })}
                                                    className="product__button-buy">ДОБАВИТЬ</button>
                                                <button
                                                    onClick={() => handleAddToWishlist({
                                                        id: t.id,
                                                        name: t.name,
                                                        price: t.price,
                                                        link: `/product/${t.id}`,
                                                        image: t.img,
                                                    })}
                                                    className="popular__button-favorite product__button-favorite"
                                                    data-tooltip={
                                                        isWishlistId(t.name, t.id)
                                                            ? "Удалить из избранного"
                                                            : "Добавить в избранное"
                                                    }
                                                >
                                                    <img src={isWishlistId(t.name, t.id)
                                                        ? "https://img.icons8.com/win10/512w/FA5252/filled-heart.png"
                                                        : "https://www.svgrepo.com/show/391884/heart-empty.svg"} alt="Add to favorite" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
                    : activeFilters === filters.reviews ? (<div className="extra__content extra__content-reviews">
                        <MainReviews productId={id} renderStars={renderStars} />
                        <Reviews productId={id} uid={uid} />
                    </div>)
                        : activeFilters === filters.description ? (<div className="extra__content">
                            <div className="extra__body">
                                <div className="extra__body-info">
                                    {description?.map((d: any, index: any) => (
                                        <p key={index}>{d}</p>
                                    ))}
                                </div>
                            </div>
                        </div>)
                            : activeFilters === filters.delivery ? (<div className="extra__content">
                                <div className="extra__body">
                                    <div className="extra__body-payship">
                                        <div className="extra__body-ship">
                                            <h2 className="payship__table-title page-title" >Доставка</h2>
                                            <div className="payship__table">
                                                <div className="payship__body">
                                                    <div className="payship__body-item">УСЛУГА</div>
                                                    <div className="payship__body-item">СТОИМОСТЬ</div>
                                                </div>
                                                <div className="payship__body">
                                                    <div className="payship__body-item">Доставка по городу до подъезда</div>
                                                    <div className="payship__body-item">800 грн</div>
                                                </div>
                                                <div className="payship__body">
                                                    <div className="payship__body-item">Доставка по городу с подъемом</div>
                                                    <div className="payship__body-item">1200 грн</div>
                                                </div>
                                                <div className="payship__body">
                                                    <div className="payship__body-item">Доставка за город</div>
                                                    <div className="payship__body-item">40 грн/км</div>
                                                </div>
                                                <div className="payship__body">
                                                    <div className="payship__body-item">Поэтажный подъем столешницы 3 метра
                                                        (в лифт не входит)</div>
                                                    <div className="payship__body-item">150 грн/этаж</div>
                                                </div>
                                                <div className="payship__body">
                                                    <div className="payship__body-item">Поэтажный подъем всего заказа</div>
                                                    <div className="payship__body-item">Уточняйте стоимость у продавца</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="extra__body-pay">
                                            <h2 className="payship__table-title page-title" >Опалата</h2>
                                            <div className="payship__text">
                                                <p>При заказе мебели предоплата составляет 30% от общей суммы по договору,
                                                    остаток
                                                    оплачивается
                                                    при получении.</p>
                                            </div>
                                            <div className="payship__pay">
                                                <div className="payship__items">
                                                    <div className="payship__item">
                                                        <div className="payship__item-img"><img src={payship1}
                                                            alt="" />
                                                        </div>
                                                        <div className="payship__item-type">Картой</div>
                                                    </div>
                                                    <div className="payship__item">
                                                        <div className="payship__item-img"><img src={payship2}
                                                            alt="" />
                                                        </div>
                                                        <div className="payship__item-type">Оплата наличными </div>
                                                    </div>
                                                    <div className="payship__item">
                                                        <div className="payship__item-img"><img src={payship3}
                                                            alt="" />
                                                        </div>
                                                        <div className="payship__item-type">Оплата через банк онлайн
                                                        </div>
                                                    </div>
                                                    <div className="payship__item">
                                                        <div className="payship__item-img"><img src={payship4}
                                                            alt="" />
                                                        </div>
                                                        <div className="payship__item-type">Рассрочка 0-0-6 </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                                : null}
        </div>
    </section>
}
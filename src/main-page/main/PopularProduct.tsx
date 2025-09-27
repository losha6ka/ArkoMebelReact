import { FC, useEffect, useState } from "react";
import ProductCard from "./PopProductHOC";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useCard } from "../../hooks/cardHook";
import Loader from "../../customLoader/CustomLoader";
import { fetchProductToFirestore } from "../../redux/thunks/productThunks";
export const PopularProduct: FC = () => {
    const { cards, isLoading } = useCard()
    const dispatch = useDispatch<AppDispatch>()
    const [loadingCard, setLoadingCards] = useState<number>(8)
    useEffect(() => {
        dispatch(fetchProductToFirestore())
    }, [dispatch])

    const loadMoreCards = () => {
        setLoadingCards((prev) => prev + 4)
    }
    const hideMoreCards = (hideTo: number) => {
        setLoadingCards(hideTo)
    }

    return <section className="main-popular popular product">
        <div className="popular__container product__container">
            <h2 className="popular__title product__title page-title"><a href="https://www.google.com/">ПОПУЛЯРНЫЕ ТОВАРЫ</a></h2>
            <div className="popular__items product__items">
                {cards && isLoading === false ? cards.slice(0, loadingCard).map((card: any) => (
                    <ProductCard
                        key={card.id}
                        id={card.id}
                        name={card.name}
                        price={card.price}
                        oldPrice={card.oldPrice}
                        discount={card.discount}
                        sizes={card.sizes}
                        product={card.product}
                        hit={card.hit}
                    />
                )) : <Loader />}
            </div>
            {cards && loadingCard < cards.length ?
                <button onClick={() => loadMoreCards()} className="product__load">
                    <span>Показать еще</span>
                </button>
                : <button onClick={() => hideMoreCards(8)} className="product__load">
                    <span>Скрыть</span>
                </button>}
        </div>
    </section >
}
import { FC, useEffect, useState } from "react"

import { Header } from "../header/Header"
import { Footer } from "../footer/Footer"
import { MainProductCard } from "./MainProductCard"
import { MainExtra } from "./MainExtra"
import { MainInteresting } from "./MainInteresting"
import { MainContact } from "./MainContact"
import { Category } from "../main/Category"
import { AppDispatch } from "../../redux/store"
import { useDispatch } from "react-redux"
import { useLocation, useParams } from "react-router-dom";
import { addActiveColor } from "../../redux/reducers/cardReducer"
import { addToCart } from "../../redux/reducers/cartReducer"
import { saveCartToFirestore } from "../../redux/thunks/cartThunks"
import { useCard } from "../../hooks/cardHook"
import { useWishlist } from "../../hooks/useWishlist"
import { Breadcrumbs } from "../Breadcrumbs"
import { fetchCommentsByProduct } from "../../redux/thunks/commentThunks"
import Loader from "../../customLoader/CustomLoader"
import { fetchProductToFirestoreById } from "../../redux/thunks/productThunks"
import { useAuth } from "../../hooks/authHook"

export const ProductCardPage: FC = () => {
    const { currentProduct, isLoading, activeColor } = useCard()
    const { uid } = useAuth()
    const { id: productId } = useParams();
    const { isWishlistId, handleAddToWishlist } = useWishlist()
    const dispatch = useDispatch<AppDispatch>()
    const [message, setMessage] = useState<string | null>(null);
    const location = useLocation();
    const defaultColor = currentProduct?.product?.color ? Object.keys(currentProduct?.product.color)[0] : null;
    const activeColorState = activeColor ?? defaultColor;
    const changeActiveColor = (color: string) => {
        dispatch(addActiveColor(color))
    }
    const handleAddToCart = (product: {
        id: string;
        name: string;
        price: any;
        image?: string;
        quantity?: number;
    }) => {
        const item = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image || "",
            quantity: product.quantity || 1,
            link: location.pathname,
        };

        dispatch(addToCart(item));
        if (uid) {
            dispatch(saveCartToFirestore(uid));
        }

        // Показать сообщение
        setMessage(`${item.name} добавлен в корзину`);

        // Убрать сообщение через 3 секунды
        setTimeout(() => setMessage(null), 3000);
    };

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductToFirestoreById(productId))
            dispatch(fetchCommentsByProduct(productId))
        }
    }, [dispatch, productId])

    return <div className="wrapper">
        {isLoading === false
            ? <div>
                <Header />
                {message && <div className="add-to-cart-message">{message}</div>}
                <Breadcrumbs />
                <MainProductCard
                    id={currentProduct?.id}
                    name={currentProduct?.name}
                    price={currentProduct?.price}
                    oldPrice={currentProduct?.oldPrice}
                    discount={currentProduct?.discount}
                    sizes={currentProduct?.sizes}
                    hit={currentProduct?.hit}
                    product={currentProduct?.product}
                    characteristics={currentProduct?.characteristics}
                    material={currentProduct?.material}
                    activeColorState={activeColorState}
                    changeActiveColor={changeActiveColor}
                    currentProduct={currentProduct}
                    handleAddToCart={handleAddToCart}
                    isWishlistId={isWishlistId}
                    handleAddToWishlist={handleAddToWishlist}
                />
                <MainExtra
                    uid={uid}
                    id={currentProduct?.id}
                    module={currentProduct?.module}
                    table={currentProduct?.table}
                    description={currentProduct?.description}
                    handleAddToCart={handleAddToCart}
                    isWishlistId={isWishlistId}
                    handleAddToWishlist={handleAddToWishlist}
                />
                <MainInteresting
                    id={currentProduct?.id}
                    name={currentProduct?.name}
                    price={currentProduct?.price}
                    oldPrice={currentProduct?.oldPrice}
                    discount={currentProduct?.discount}
                    sizes={currentProduct?.sizes}
                    hit={currentProduct?.hit}
                    product={currentProduct?.product}
                />
                <Category />
                <MainContact />
                <Footer />
            </div>
            : <Loader />
        }
    </div >
}
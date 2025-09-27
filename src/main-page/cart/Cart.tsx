import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { removeFromCart, clearCart, decrementQuantity, incrementQuantity } from "../../redux/reducers/cartReducer";
import { useAuth } from "../../hooks/authHook";
import { saveCartToFirestore } from "../../redux/thunks/cartThunks";
import { Header } from "../header/Header";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../footer/Footer";

const Cart: React.FC = () => {
    const { uid } = useAuth();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const parsePrice = (priceString: any): number => {
        return parseInt(priceString.replace(/\s|грн\.?/gi, ''), 10);
    };

    const total = cartItems.reduce((sum, item) => {
        const price = parsePrice(item.price);
        return sum + price * item.quantity;
    }, 0);

    useEffect(() => {
        if (uid && cartItems.length > 0) {
            dispatch(saveCartToFirestore(uid));
        }
    }, [cartItems, uid, dispatch]);

    const handleRemove = (id: string) => {
        if (uid) {
            dispatch(removeFromCart(id));
            dispatch(saveCartToFirestore(uid));
        }
    };
    const handleClear = () => {
        if (uid) {
            dispatch(clearCart());
            dispatch(saveCartToFirestore(uid));
        }
    };


    const handleIncrementQuantity = (id: string | number) => {
        if (uid) {
            dispatch(incrementQuantity(id))
            dispatch(saveCartToFirestore(uid))
        }
    }
    const handleDecrementQuantity = (id: string | number) => {
        if (uid) {
            dispatch(decrementQuantity(id))
            dispatch(saveCartToFirestore(uid))
        }
    }

    return (
        <div className="wrapper">

            <Header />
            <div className={cartItems.length === 0 ? "cart empty" : "cart"}>
                <div className="cart__container">
                    <h2 className="cart__title">🛒 Корзина</h2>
                    {cartItems.length === 0 ? (
                        <p className="cart__empty">Ваша корзина пуста</p>
                    ) : (
                        <>
                            <ul className="cart__list">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="cart__item">
                                        <Link className="cart__item-info" to={item.link}>
                                            {item.image && (
                                                <div className="cart__item-photo">
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                            )}
                                            <span className="cart__item-name">{item.name}</span>
                                        </Link>

                                        <div className="cart__item-quantity">
                                            <button
                                                className="cart__quantity-btn"
                                                onClick={() => handleDecrementQuantity(item.id)}
                                            >
                                                −
                                            </button>
                                            <span className="cart__quantity-number">{item.quantity}</span>
                                            <button
                                                className="cart__quantity-btn"
                                                onClick={() => handleIncrementQuantity(item.id)}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <span className="cart__item-price">{item.price} грн</span>

                                        <button className="cart__remove-btn" onClick={() => handleRemove(item.id)}>
                                            ✖
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="cart__summary">
                                <p className="cart__total">Итого: <strong>{total} грн</strong></p>
                                <div className="cart__buttons">
                                    <button className="cart__btn cart__btn--clear" onClick={handleClear}>
                                        Очистить корзину
                                    </button>
                                    <button className="cart__btn cart__btn--checkout"
                                        onClick={() => navigate("/checkout")}
                                        disabled={cartItems.length === 0}>
                                        Оформить заказ
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;

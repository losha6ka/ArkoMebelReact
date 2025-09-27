import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { removeFromWishlist } from "../../redux/reducers/wishlistReducer";
import { useNavigate } from "react-router-dom";
import { Header } from "../header/Header";
import { useAuth } from "../../hooks/authHook";
import { saveWishlistToFirestore } from "../../redux/thunks/wishlistThunks";
import { useWishlist } from "../../hooks/useWishlist";
import { Footer } from "../footer/Footer";

const Wishlist: FC = () => {
    const { uid } = useAuth()
    const { wishlist: wishlists } = useWishlist()
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    useEffect(() => {
        if (uid && wishlists.length > 0) {
            dispatch(saveWishlistToFirestore(uid));
        }
    }, [wishlists, uid, dispatch]);

    const handleRemove = (id: string) => {
        if (uid) {
            dispatch(removeFromWishlist(id));
            dispatch(saveWishlistToFirestore(uid))
        }
    };
    return (
        <div className="wrapper">
            <Header />
            <div className={wishlists.length === 0 ? "wishlist empty" : "wishlist"}>
                <div className="wishlist__container">
                    <h2 className="wishlist__title">💖 Избранное</h2>
                    {wishlists.length === 0
                        ? (<p className="wishlist-empty">У вас нет избранных товаров.</p>)
                        : (<div className="wishlist-grid">
                            {wishlists.map((item) => (
                                <div key={item.id} className="wishlist-item" style={{ cursor: "pointer" }}>
                                    <div className="wishlist-image" onClick={() => navigate(item.link)}>
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <h3 className="wishlist-name" onClick={() => navigate(item.link)}>{item.name}</h3>
                                    <div className="wishlist-info">
                                        <p onClick={() => navigate(item.link)}>{item.price} грн</p>
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="popular__button-favorite product__button-favorite"
                                            data-tooltip={"Удалить из избранного"} >
                                            <img src="https://img.icons8.com/win10/512w/FA5252/filled-heart.png" alt="Add to favorite" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>)}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Wishlist;

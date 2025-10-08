// ProfileLayout.tsx
import { FC, ReactNode } from "react";
import profileSVG from "../img/icons/profile.svg";
import cartSVG from "../img/icons/cart.svg";
import starsSVG from "../img/icons/stars.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { setUser } from "../redux/reducers/authReducer";
import { auth } from "../firebase/firebase";
import { Header } from "../main-page/header/Header";
import { Footer } from "../main-page/footer/Footer";

interface ProfileLayoutProps {
    title: string;     // Заголовок страницы ("ПРОФИЛЬ", "МОИ ЗАКАЗЫ", "ОТЗЫВЫ")
    children: ReactNode; // Контент внутри
}

export const ProfileLayout: FC<ProfileLayoutProps> = ({ title, children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const currentPathname = location.pathname
    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(setUser({ uid: "", email: "", name: "", phone: "" }));
            navigate("/auth");
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    };

    return (
        <div className="wrapper">
            <Header />
            <section className="main-orders orders">
                <div className="orders__container">
                    <div className="profile__header orders__header">
                        <h2 className="orders__title profile__title page-title">{title}</h2>
                        <button onClick={handleLogout} className="profile__unlogin">Выйти</button>
                    </div>

                    <div className="profile__body orders__body">
                        {/* Левая навигация */}
                        <ul className="profile__section orders__section">
                            <li className="profile__li orders__li">
                                <img src={profileSVG} alt="" />
                                <Link to="/profile" className={currentPathname === "/profile" ? "profile__tab orders__tab active" : "profile__tab orders__tab"}>Профиль</Link>
                            </li>
                            <li className="profile__li orders__li">
                                <img src={cartSVG} alt="" />
                                <Link to="/orders" className={currentPathname === "/orders" ? "profile__tab orders__tab active" : "profile__tab orders__tab"}>Мои заказы</Link>
                            </li>
                            <li className="profile__li orders__li">
                                <img src={starsSVG} alt="" />
                                <Link to="/reviews" className={currentPathname === "/reviews" ? "profile__tab orders__tab active" : "profile__tab orders__tab"}>Отзывы</Link>
                            </li>
                        </ul>

                        {/* Правая область (где выводятся данные) */}
                        {children}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useCard } from "../hooks/cardHook";

const breadcrumbMap: { [key: string]: string } = {
    "": "Главная",
    kitchen: "Кухни",
    action: "Акции",
    gathering: "Сборка",
    delivery: "Доставка",
    info: "О нас",
    ourworks: "Наши работы",
    contacts: "Контакты",
    wishlist: "Избранное",
    cart: "Корзина",
    checkout: "Оформление заказа",
    "thank-you": "Спасибо за заказ",
    profile: "Профиль",
    auth: "Вход / Регистрация",
};

export const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const { id: productId } = useParams();
    const pathnames = location.pathname.split("/").filter(Boolean);

    // Получаем имя товара по ID
    const { currentProduct } = useCard()
    return (<div className="page-action">
        <div className="page-action__container">
            <nav className="page-action__path">
                <Link to="/" className="page-action__path-main">Главная</Link>

                {pathnames.map((segment, index) => {
                    const isLast = index === pathnames.length - 1;
                    // Если segment — "product", подменяем на "Кухни"
                    if (segment === "product") {
                        return (
                            <Link key="kitchen" to="/kitchen" className="page-action__path-main">
                                Кухни
                            </Link>
                        );
                    }
                    if (segment === productId && currentProduct?.name) {
                        return (
                            <Link to={""} key={segment} className="page-action__path-main page-action__path-active">
                                {currentProduct.name}
                            </Link>
                        );
                    }

                    // Стандартное поведение
                    const path = "/" + pathnames.slice(0, index + 1).join("/");
                    const name = breadcrumbMap[segment] || decodeURIComponent(segment);
                    return isLast ? (
                        <Link to={""} key={path} className="page-action__path-main page-action__path-active">
                            {name}
                        </Link>
                    ) : (
                        <Link key={path} to={path} className="page-action__path-main">
                            {name}
                        </Link>
                    );
                })}
            </nav>
        </div>
    </div>
    );
};

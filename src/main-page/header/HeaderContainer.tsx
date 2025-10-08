import { FC, useEffect, useState } from "react";
import locationSVG from "../../img/icons/location.svg"
import logoSVG from "../../img/logo/logo.svg"
import mapSVG from "../../img/icons/map.svg"
import phoneSVG from "../../img/icons/phone.svg"
import profileSVG from "../../img/icons/profile.svg"
import favoriteSVG from "../../img/icons/favorite.svg"
import cartSVG from "../../img/icons/cart.svg"
import { Link } from "react-router-dom";
import { HeaderMenuHOC } from "./HeaderMenuHOC";
import HeaderSearch from "./HeaderSearch";
interface HeaderContainerProps {
    name: string,
    logged: boolean
}
export const HeaderContainer: FC<HeaderContainerProps> = ({ name, logged }) => {
    const [activeBurger, setActiveBurger] = useState<boolean>(false)
    const [headerFixed, setHeaderFixed] = useState<boolean>(false)
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const handleClickMenu = (id: string) => {
        setActiveSection(prev => (prev === id ? null : id));
    };
    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setActiveSection(null);
        }
    };
    useEffect(() => {
        if (activeBurger) {
            // блокируем скролл всего body
            document.body.style.overflow = "hidden";
        } else {
            // возвращаем нормальное поведение
            document.body.style.overflow = "";
        }

        // на случай размонтирования компоненты
        return () => {
            document.body.style.overflow = "";
        };
    }, [activeBurger]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) { // можно менять значение порога
                setHeaderFixed(true);
            } else {
                setHeaderFixed(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <div className="header__container">
        <div className="header__top top-header">
            <div className="top-header__filler">
                <HeaderSearch top={true} />
            </div>
            <div tabIndex={0} className={activeBurger ? "top-header__menu active" : "top-header__menu"} onBlur={handleBlur}>
                <div className="top-header__items">
                    <HeaderMenuHOC icon={true} variant="header" activeSection={activeSection} handleClickMenu={handleClickMenu} />
                </div>
                <div className="top-header__location">
                    <img src={locationSVG} alt="" />
                    <select className="top-header__city" name="" id="YourCity">
                        <option className="top-header__city" value="Kiev">Kiev</option>
                        <option className="top-header__city" value="Kiev">Kiev</option>
                        <option className="top-header__city" value="Kiev">Kiev</option>
                        <option className="top-header__city" value="Kiev">Kiev</option>
                    </select>
                </div>
                <div className="top-header__number">
                    <a className="top-header__tel" href="tel:89615259191"><img src={phoneSVG}
                        alt="" /> 8
                        (961) 525 91 91</a>
                    <a href="/" className="top-header__reverse-call">Заказать обратный звонок</a>
                </div>
                <ul className="top-header__list">
                    <li className="top-header__item item-hiden"><a href="favorite.html"
                        className="top-header__link">Избранное</a>
                    </li>
                    <li className="top-header__item"><Link to={'/action'} className="top-header__link">Акции</Link></li>
                    <li className="top-header__item"><Link to={'/gathering'} className="top-header__link">Сборка</Link>
                    </li>
                    <li className="top-header__item"><Link to={'/delivery'} className="top-header__link">Доставка</Link>
                    </li>
                    <li className="top-header__item"><Link to={'/info'} className="top-header__link">О нас</Link>
                    </li>
                    <li className="top-header__item item-hiden"><Link to={"/ourworks"}
                        className="top-header__link">Наши работы</Link>
                    </li>
                    <li className="top-header__item item-hiden"><Link to={"/contacts"}
                        className="top-header__link">Контакты</Link>
                    </li>
                </ul>
            </div>
            <div className={activeBurger ? "top-header__info active" : "top-header__info"}>
                <ul className="top-header__information">
                    <li className="top-header__item"><Link to={"/ourworks"} className="top-header__link-work">Наши
                        работы</Link>
                    </li>
                    <li className="top-header__item"><Link to={"/contacts"}
                        className="top-header__link-contact">Контакты</Link>
                    </li>
                </ul>
            </div>
            <div className="top-header__burger" onClick={() => setActiveBurger(!activeBurger)}>
                <button className={activeBurger ? "menu-btn active" : "menu-btn"}>
                    <span></span>
                </button>
            </div>
        </div>
        <div className={headerFixed ? "header__mid mid-header fixed" : "header__mid mid-header"}>
            <div className="mid-header__logo logo">
                <Link to={"/"}>
                    <img className="logo__img" src={logoSVG} alt="" />
                </Link>
            </div>
            <div className="mid-header__location">
                <img src={mapSVG} alt="" className="mid-header__base-img" />
                <div className="mid-header__base"><Link to={"/"}>ул. Киевская, 144 корп. - 1</Link></div>
                <div className="mid-header__base-fare"><Link to={"/"}>Схема проезда</Link></div>
            </div>
            <HeaderSearch />
            <div className="mid-header__call">
                <a href="tel:89615259191"><img src={phoneSVG} alt="" /></a>
                <div className="mid-header__number">
                    <a className="mid-header__number-tel" href="tel:3415242503">3 (415) 242 503</a>
                    <a href="/" className="mid-header__number-call">Заказать звонок</a>
                </div>
            </div>
            <div className="mid-header__main">
                {logged ?
                    <Link to={"/profile"}>
                        <div className="mid-header__item">
                            <img className="mid-header__item-img" src={profileSVG} alt="" />
                            <div className="mid-header__item-text">
                                {name}
                            </div>
                        </div>
                    </Link>
                    : <Link to={"/auth"}>
                        <div className="mid-header__item">
                            <img className="mid-header__item-img" src={profileSVG} alt="" />
                            <div className="mid-header__item-text">
                                Войти
                            </div>
                        </div>
                    </Link>
                }
                <Link to={"/wishlist"}>
                    <div className="mid-header__item">
                        <img className="mid-header__item-img" src={favoriteSVG} alt="" />
                        <div className="mid-header__item-text">Избранное</div>
                    </div>
                </Link>
                <Link to={"/cart"}>
                    <div className="mid-header__item">
                        <img className="mid-header__item-img" src={cartSVG} alt="" />
                        <div className="mid-header__item-text">Корзина</div>
                    </div>
                </Link>
            </div>
            <div className="top-header__burger mid-header__burger" onClick={() => setActiveBurger(!activeBurger)}>
                <button className={activeBurger ? "menu-btn menus-btn active" : "menu-btn menus-btn"}>
                    <span></span>
                </button>
            </div>
        </div>
    </div>
}
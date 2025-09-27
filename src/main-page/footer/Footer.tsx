import { FC, useState } from "react";
import "../../SCSS/footer.scss"
import logoSVG from "../../img/logo/logo.svg"
import instIcon from "../../img/social/inst.svg"
import { HeaderMenuHOC } from "../header/HeaderMenuHOC";
export const Footer: FC = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const handleClickMenu = (id: string) => {
        setActiveSection(prev => (prev === id ? null : id));
    };
    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setActiveSection(null);
        }
    };
    return <footer className="footer">
        <div className="footer__container">
            <div className="footer__main">
                <div className="footer__logo logo">
                    <a href="index.html">
                        <img className="footer__logo-img logo__img" src={logoSVG} alt="" />
                    </a>
                    <a href="tel:3296152591" className="footer__tel-hiden">32-961-525-911</a>
                </div>
                <a href="tel:3296152591" className="footer__tel">32-961-525-911</a>
                <div className="footer__info">
                    <div className="footer__info-item">
                        <div className="footer__info-title">Время работы:</div>
                        <div className="footer__info-content">с 10:00 до 19:00</div>
                    </div>
                    <div className="footer__info-item">
                        <div className="footer__info-title">Адрес:</div>
                        <a href="https://www.google.com/" className="footer__info-content">Чернодар,
                            ул. Киевская 144 корп. - 1</a>
                    </div>
                    <div className="footer__info-item">
                        <div className="footer__info-title">Почта:</div>
                        <a href="mailto:autoemail@gmail.com" className="footer__info-content">autoemail@gmail.com</a>
                    </div>
                </div>
                <div className="footer__social">
                    <div className="footer__social-title">Мы в Инстаграме</div>
                    <a className="footer__social-img" href="https://www.instagram.com">
                        <img src={instIcon} alt="" />
                    </a>
                </div>
            </div>
            <div className="footer__navigation">
                <div className="footer__item">
                    <div className="footer__item-title"><a href="kitchen.html">Кухни</a></div>
                    <ul className="footer__item-content">
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Модульные кухни</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Готовые комплекты</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Маленькие кухни</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Угловые кухни</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Кухонные уголки</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Столы кухонные</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Стулья для кухни</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Комплектующие</a>
                        </li>
                    </ul>
                </div>
                <div className="footer__item">
                    <div className="footer__item-title"><a href="kitchen.html">Гостинные</a></div>
                    <ul className="footer__item-content">
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Модульные
                            </a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Журнальные столы</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Полки</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Тумбы под ТВ</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Шкафы</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Стеллажи</a>
                        </li>
                    </ul>
                </div>
                <div className="footer__item">
                    <div className="footer__item-title"><a href="kitchen.html">Спальни</a></div>
                    <ul className="footer__item-content">
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Кровати</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Матрацы</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Шкафы</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Комоды</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Столы туалетные</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Тумбы прикроватные</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Зеркала</a>
                        </li>
                    </ul>
                </div>
                <div className="footer__item">
                    <div className="footer__item-title"><a href="kitchen.html">Диваны</a></div>
                    <ul className="footer__item-content">
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Прямые</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Угловые</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">На металлокаркасе</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Кресла</a>
                        </li>
                    </ul>
                </div>
                <div className="footer__item">
                    <div className="footer__item-title"><a href="kitchen.html">Детские</a></div>
                    <ul className="footer__item-content">
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Кровати</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Полки</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Столы</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Тумбы</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Шкафы</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Комоды</a>
                        </li>
                    </ul>
                </div>
                <div className="footer__item">
                    <div className="footer__item-title"><a href="kitchen.html">Прихожие</a></div>
                    <ul className="footer__item-content">
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Модульные</a>
                        </li>
                        <li className="footer__item-list">
                            <a href="https://www.google.com/" className="footer__item-link">Обувницы</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer__navigation-hiden">
                <HeaderMenuHOC variant="header" icon={false} activeSection={activeSection} handleClickMenu={handleClickMenu} />
            </div>
        </div>
        <div className="footer__copyrite">© Все права защищены</div>
    </footer>
}
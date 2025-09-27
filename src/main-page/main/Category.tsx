import { FC } from "react";
import { Link } from "react-router-dom";

export const Category: FC = () => {
    return <section className="main-category category">
        <div className="category__container">
            <h2 className="category__title page-title"><Link to={"/kitchen"}>ПОПУЛЯРНЫЕ КАТЕГОРИИ</Link></h2>
            <div className="category__navigation">
                <ul className="category__menu">
                    <li className="category__list"><Link to={"/kitchen"} className="category__link">КУХНИ</Link></li>
                    <li className="category__list"><Link to={"/kitchen"} className="category__link">КРОВАТИ</Link></li>
                    <li className="category__list"><Link to={"/kitchen"} className="category__link">ГОСТИННЫЕ</Link></li>
                    <li className="category__list"><Link to={"/kitchen"} className="category__link">ШКАФ -КУПЕ</Link></li>
                    <li className="category__list"><Link to={"/kitchen"} className="category__link">СПАЛЬНИ</Link></li>
                    <li className="category__list"><Link to={"/kitchen"} className="category__link">ПРИХОЖИЕ</Link></li>
                    <li className="category__list"><Link to={"/kitchen"} className="category__link">ДИВАНЫ</Link></li>
                    <li className="category__list"><Link to={"/kitchen"} className="category__link">ДЕТСКИЕ</Link></li>
                    <li className="category__list"><Link to={"/kitchen"} className="category__link">СТУЛЬЯ</Link></li>
                    <li className="category__list"><Link to={"/kitchen"} className="category__link">СТОЛЫ</Link></li>
                    <li className="category__list"><Link to={"/kitchen"} className="category__link">КУХНИ</Link></li>
                    <li className="category__list"><Link to={"/kitchen"} className="category__link">КРОВАТИ</Link></li>
                    <li className="category__list"><Link to={"/kitchen"} className="category__link">ГОСТИННЫЕ</Link></li>
                    <li className="category__list"><Link to={"/kitchen"} className="category__link">ШКАФ -КУПЕ</Link></li>
                    <li className="category__list category__list-hiden"><Link to={"/kitchen"}
                        className="category__link">СПАЛЬНИ</Link></li>
                    <li className="category__list category__list-hiden"><Link to={"/kitchen"}
                        className="category__link">ПРИХОЖИЕ</Link></li>
                    <li className="category__list category__list-hiden"><Link to={"/kitchen"}
                        className="category__link">ДИВАНЫ</Link>
                    </li>
                    <li className="category__list category__list-hiden"><Link to={"/>kitchen"}
                        className="category__link">ДЕТСКИЕ</Link></li>
                    <li className="category__list category__list-hiden"><Link to={"/kitchen"}
                        className="category__link">СТУЛЬЯ</Link>
                    </li>
                    <li className="category__list category__list-hiden"><Link to={"/kitchen"}
                        className="category__link">СТОЛЫ</Link>
                    </li>
                    <li className="category__list category__list-hiden"><Link to={"/kitchen"}
                        className="category__link">КУХНИ</Link>
                    </li>
                    <li className="category__list category__list-hiden"><Link to={"/kitchen"}
                        className="category__link">КРОВАТИ</Link></li>
                    <li className="category__list category__list-hiden"><Link to={"/kitchen"}
                        className="category__link">ШКАФ
                        -КУПЕ</Link></li>
                    <li className="category__list category__list-hiden"><Link to={"/kitchen"}
                        className="category__link">СПАЛЬНИ</Link></li>
                    <li className="category__list category__list-hiden"><Link to={"/kitchen"}
                        className="category__link">ПРИХОЖИЕ</Link></li>
                    <li className="category__list category__list-hiden"><Link to={"/kitchen"}
                        className="category__link">ДИВАНЫ</Link>
                    </li>
                    <li className="category__list category__list-hiden"><Link to={"/kitchen"}
                        className="category__link">ШКАФ
                        -КУПЕ</Link></li>
                    <li className="category__list category__list-hiden"><Link to={"/kitchen"}
                        className="category__link">ГОСТИННЫЕ</Link></li>
                    <li className="category__list category__list-hiden"><Link to={"/kitchen"}
                        className="category__link">СПАЛЬНИ</Link></li>
                    <li className="category__list category__list-hiden"><Link to={"/kitchen"}
                        className="category__link">ДЕТСКИЕ</Link></li>
                    <li className="category__list category__list-hiden"><Link to={"/kitchen"}
                        className="category__link">СТУЛЬЯ</Link>
                    </li>

                </ul>
            </div>
        </div>
    </section>
}
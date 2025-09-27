import { FC } from "react";
import portfolio1 from "../../img/portfolio/01.jpg"
import portfolio2 from "../../img/portfolio/02.jpg"
import portfolio3 from "../../img/portfolio/03.jpg"
import portfolio4 from "../../img/portfolio/04.jpg"
import { Link } from "react-router-dom";

export const Portfolio: FC = () => {
    return <section className="main-portfolio portfolio">
        <div className="portfolio__container">
            <h2 className="portfolio__title">
                <Link to={"/ourworks"} className="page-title" >НАШИ РАБОТЫ</Link>
                <a href="https://www.google.com/">Смотреть все работы</a>
            </h2>
            <div className="portfolio__items">
                <div className="portfolio__card">
                    <Link to={"/ourworks"} className="portfolio__category">КУХНЯ ГЛЕТЧЕР</Link>
                    <Link to={"/ourworks"}><img className="portfolio__img" src={portfolio1}
                        alt="" /></Link>
                </div>
                <div className="portfolio__card">
                    <Link to={"/ourworks"} className="portfolio__category">ГОСТИННАЯ ДЕНВЕР</Link>
                    <Link to={"/ourworks"}><img className="portfolio__img" src={portfolio2}
                        alt="" /></Link>
                </div>
                <div className="portfolio__card portfolio__card-height">
                    <Link to={"/ourworks"} className="portfolio__category">КУХНЯ ЛОНДОН</Link>
                    <Link to={"/ourworks"}><img className="portfolio__img" src={portfolio3}
                        alt="" /></Link>
                </div>
                <div className="portfolio__card portfolio__card-width">
                    <Link to={"/ourworks"} className="portfolio__category">КУХНЯ АМЕЛИ</Link>
                    <Link to={"/ourworks"}><img className="portfolio__img" src={portfolio4}
                        alt="" /></Link>
                </div>
            </div>
        </div>
    </section>
}
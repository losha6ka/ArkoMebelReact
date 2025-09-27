import { FC } from "react";
import catalog01 from "../../img/cataloge/01.jpg"
import catalog02 from "../../img/cataloge/02.jpg"
import catalog03 from "../../img/cataloge/03.jpg"
import catalog04 from "../../img/cataloge/04.jpg"
import catalog05 from "../../img/cataloge/05.jpg"
import catalog06 from "../../img/cataloge/06.jpg"
import catalog07 from "../../img/cataloge/07.jpg"
import catalog08 from "../../img/cataloge/08.jpg"
import { Link } from "react-router-dom";

export const Cataloge: FC = () => {
    return <section className="main-cataloge cataloge">
        <div className="cataloge__container">
            <h2 className="cataloge__title page-title"><a href="cataloge.html">КАТАЛОГ</a> </h2>
            <div className="cataloge__items">
                <Link to={"/kitchen"} className="cataloge__item">
                    <div className="cataloge__category">КУХНИ</div>
                    <div className="cataloge__img">
                        <img src={catalog01} alt="" />
                    </div>
                </Link>
                <Link to={"/kitchen"} className="cataloge__item">
                    <h2 className="cataloge__category">ГОСТИННЫЕ</h2>
                    <div className="cataloge__img">
                        <img src={catalog02} alt="" />
                    </div>
                </Link>
                <Link to={"/kitchen"} className="cataloge__item">
                    <h2 className="cataloge__category">СПАЛЬНИ</h2>
                    <div className="cataloge__img">
                        <img src={catalog03} alt="" />
                    </div>
                </Link>
                <Link to={"/kitchen"} className="cataloge__item">
                    <h2 className="cataloge__category">ПРИХОЖИЕ</h2>
                    <div className="cataloge__img">
                        <img src={catalog04} alt="" />
                    </div>
                </Link>
                <Link to={"/kitchen"} className="cataloge__item">
                    <h2 className="cataloge__category">ШКАФЫ-КУПЕ</h2>
                    <div className="cataloge__img">
                        <img src={catalog05} alt="" />
                    </div>
                </Link>
                <Link to={"/kitchen"} className="cataloge__item">
                    <h2 className="cataloge__category">ДЕТСКИЕ</h2>
                    <div className="cataloge__img">
                        <img src={catalog06} alt="" />
                    </div>
                </Link>
                <Link to={"/kitchen"} className="cataloge__item">
                    <h2 className="cataloge__category">ДИВАНЫ</h2>
                    <div className="cataloge__img">
                        <img src={catalog07} alt="" />
                    </div>
                </Link>
                <Link to={"/kitchen"} className="cataloge__item">
                    <h2 className="cataloge__category">СТОЛЫ И СТУЛЬЯ</h2>
                    <div className="cataloge__img">
                        <img src={catalog08} alt="" />
                    </div>
                </Link>
            </div>
        </div>
    </section>
}
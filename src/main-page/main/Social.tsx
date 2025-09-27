import { FC } from "react";
import portfolio1 from "../../img/gallery-inst/01.jpg"

export const Social: FC = () => {
    return <section className="main-social social">
        <div className="social__container">
            <h2 className="social__title page-title"><a href="https://www.instagram.com/losha6ka/">МЫ В
                INSTAGRAM</a></h2>
            <div className="social__gallery">
                <div className="social__item"><a href="https://www.instagram.com/losha6ka/"><img
                    className="social__item-img" src={portfolio1} alt="" /></a></div>
            </div>
        </div>
    </section>
}
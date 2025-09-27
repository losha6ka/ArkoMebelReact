import { FC } from "react";
import mapI from "../../img/benefits/map.svg"
import fastExport from "../../img/benefits/fast-export.svg"
import littleCost from "../../img/benefits/little-cost.svg"
import assurance from "../../img/benefits/assurance.svg"
export const Benefits: FC = () => {
    return <section className="main-benefits benefits">
        <div className="benefits__container">
            <h2 className="benefits__title page-title"><a href="https://www.google.com/">НАШИ ПРЕИМУЩЕСТВА</a></h2>
            <div className="benefits__items">
                <div className="benefits__item">
                    <div className="benefits__item-img"><img src={mapI} alt="" /></div>
                    <div className="benefits__item-title">Удобное расположение магазина</div>
                </div>
                <div className="benefits__item">
                    <div className="benefits__item-img"><img src={fastExport} alt="" />
                    </div>
                    <div className="benefits__item-title">Быстрая доставка</div>
                </div>
                <div className="benefits__item">
                    <div className="benefits__item-img"><img src={littleCost} alt="" />
                    </div>
                    <div className="benefits__item-title">Низкие цены<div className="benefits__item-subtitle">Если
                        найдете дешевле - сделаем скидку</div>
                    </div>
                </div>
                <div className="benefits__item">
                    <div className="benefits__item-img"><img src={assurance} alt="" />
                    </div>
                    <div className="benefits__item-title">Гарантия качества</div>
                </div>
            </div>
        </div>
    </section>
}
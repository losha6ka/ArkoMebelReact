import { FC } from "react";
import payship1 from "../../img/payship/01.svg"
import payship2 from "../../img/payship/02.svg"
import payship3 from "../../img/payship/03.svg"
import payship4 from "../../img/payship/04.svg"
import locationIcon from "../../img/icons/location.svg"
export const DeliveryComponent: FC = () => {
    return <section className="main-payship payship">
        <div className="payship__container">
            <h2 className="payship__title page-title">ДОСТАВКА И ОПЛАТА</h2>
            <div className="payship__adress">
                <div className="payship__adress-text"></div>
                <div className="payship__adress-map">
                    <div><img src={locationIcon} alt="" />Адрес:</div>
                    <a href="/">г. Ирпень, ул. Архангельская 144 корпус-1 (ЖК Светлый)</a>
                </div>
            </div>
            <div className="payship__text">
                <p>При заказе мебели предоплата составляет 30% от общей суммы по договору, остаток оплачивается
                    при получении.</p>
            </div>
            <div className="payship__pay">
                <div className="payship__items">
                    <div className="payship__item">
                        <div className="payship__item-img"><img src={payship1} alt="" /></div>
                        <div className="payship__item-type">Картой</div>
                    </div>
                    <div className="payship__item">
                        <div className="payship__item-img"><img src={payship2} alt="" /></div>
                        <div className="payship__item-type">Оплата наличными </div>
                    </div>
                    <div className="payship__item">
                        <div className="payship__item-img"><img src={payship3} alt="" /></div>
                        <div className="payship__item-type">Оплата через банк онлайн
                        </div>
                    </div>
                    <div className="payship__item">
                        <div className="payship__item-img"><img src={payship4} alt="" /></div>
                        <div className="payship__item-type">Рассрочка 0-0-6 </div>
                    </div>
                </div>
            </div>
            <h2 className="payship__table-title page-title">Стоимость доставки</h2>
            <div className="payship__table">
                <div className="payship__body">
                    <div className="payship__body-item">УСЛУГА</div>
                    <div className="payship__body-item">СТОИМОСТЬ</div>
                </div>
                <div className="payship__body">
                    <div className="payship__body-item">Доставка по городу до подъезда</div>
                    <div className="payship__body-item">800 грн</div>
                </div>
                <div className="payship__body">
                    <div className="payship__body-item">Доставка по городу с подъемом</div>
                    <div className="payship__body-item">1200 грн</div>
                </div>
                <div className="payship__body">
                    <div className="payship__body-item">Доставка за город</div>
                    <div className="payship__body-item">40 грн/км</div>
                </div>
                <div className="payship__body">
                    <div className="payship__body-item">Поэтажный подъем столешницы 3 метра
                        (в лифт не входит)</div>
                    <div className="payship__body-item">150 грн/этаж</div>
                </div>
                <div className="payship__body">
                    <div className="payship__body-item">Поэтажный подъем всего заказа</div>
                    <div className="payship__body-item">Уточняйте стоимость у продавца</div>
                </div>
            </div>
            <h2 className="payship__subtitle page-title">ОБЪЕМ ЗАКАЗА НЕ ВЛИЯЕТ НА СТОИМОСТЬ ДОСТАВКИ</h2>
        </div>
    </section>
} 
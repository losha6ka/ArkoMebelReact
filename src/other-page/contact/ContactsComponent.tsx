import { FC } from "react";
import contactImg from "../../img/contact/01.jpg"
export const ContactsComponent: FC = () => {
    return <section className="main-contact contact">
        <div className="contact__container">
            <h2 className="contact__title page-title">КОНТАКТЫ</h2>
            <div className="contact__items">
                <div className="contact__img"><img src={contactImg} alt="" /></div>
                <div className="contact__body">
                    <div className="contact__body-text">
                        <p>Центральный склад и магазин находится в городе Краснодар. Машина в Анапу идет 1 - 2
                            раза в неделю. Мы предлагаем мебель
                            в Анапе по доступным ценам Краснодара, со стоимостью доставки как по городу. </p>
                    </div>
                    <div className="footer__info contact__body-info">
                        <div className="footer__info-item">
                            <div className="footer__info-title">Время работы:</div>
                            <div className="footer__info-content">ежедневно с 10:00 до 19:00</div>
                        </div>
                        <div className="footer__info-item">
                            <div className="footer__info-title">Адрес:</div>
                            <a href="" className="footer__info-content">Чернодар, ул. Киевская 144 корп. - 1</a>
                        </div>
                        <div className="footer__info-item">
                            <div className="footer__info-title">Телефон:</div>
                            <a href="tel:61625259191" className="footer__info-content">6 (461) 225 91 91</a>
                        </div>
                        <div className="footer__info-item">
                            <div className="footer__info-title">Почта:</div>
                            <a href="mailto:autoemail@gmail.com"
                                className="footer__info-content">autoemail@gmail.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}
import { FC } from "react";
import mapBg from "../../img/contact-map/bg.jpg"

export const MainContact: FC = () => {
    return <section className="main-contact contacts">
        <div className="contacts__container">
            <div className="contacts__contact">
                <div className="contacts__contact-bg"><img src={mapBg} alt="" /></div>
                <h2 className="contacts__contact-title page-title">НАШИ КОНТАКТЫ</h2>
                <div className="contacts__contact-geodan"><a href="google.com">Керечевская, Киевская 144 корпус -1</a></div>
                <div className="contacts__contact-tel"><a href="tel:689215159191">+68 921-515-91-91</a></div>
                <button className="contacts__contact-button">ЗАДАТЬ ВОПРОС</button>
            </div>
            <div className="contacts__map"><iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2800991.3281649183!2d29.7590969!3d46.718694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1672872732466!5m2!1sru!2sua"
                style={{ border: "0" }}
                //  allowfullscreen="" 
                loading="lazy"
                title="map"
            // referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            </div>
        </div>
    </section>
}
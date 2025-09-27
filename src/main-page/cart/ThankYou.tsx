import React from "react";
import { Link, useLocation } from "react-router-dom";

const ThankYou: React.FC = () => {
    const location = useLocation();
    const email = location.state?.email || "";

    return (
        <div className="thank-you-container">
            <div className="thank-you-card">
                <h1>🎉 Спасибо за заказ!</h1>
                <p>Мы получили ваш заказ и уже начали его обрабатывать.</p>
                {email && (
                    <p>
                        Копия заказа была отправлена на вашу почту:{" "}
                        <strong>{email}</strong>
                    </p>
                )}
                <p>Скоро с вами свяжется менеджер для уточнения деталей доставки.</p>
                <Link to="/" className="thank-you-home-btn">
                    На главную
                </Link>
            </div>
        </div>
    );
};

export default ThankYou;

import { FC } from "react";

export const Question: FC = () => {
    return <section className="main-question question">
        <div className="question__container">
            <div className="question__body">
                <h2 className="question__title">ОСТАЛИСЬ ВОПРОСЫ?</h2>
                <div className="question__about">
                    <p>Расскажем, подскажем, поможем подобрать лучшее с учетом любого бюджета!</p>
                </div>
                <form className="question__form" action="#">
                    <div className="question__form-name"><input type="text" placeholder="Имя*" name="name" /></div>
                    <div className="question__form-tel"><input type="tel" placeholder="Телефон*" name="phone" /></div>
                    <div className="question__form-accept">
                        <input type="checkbox" />
                        <p>
                            Нажимая на кнопку “отправить”, вы
                            даете
                            согласие на обработку ваших персональных данных.
                        </p>
                    </div>
                    <button className="question__form-button" type="submit">ОТПРАВИТЬ</button>
                </form>
            </div>
        </div>
    </section>
}
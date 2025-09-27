import { FC } from "react";
import principle from "../../img/principle/01.jpg"
export const Principle: FC = () => {
    return <section className="main-principle principle">
        <div className="principle__container">
            <div className="principle__items">
                <div className="principle__img"><img src={principle} alt="" /></div>
                <div className="principle__body">
                    <h2 className="principle__title page-title">ПРИНЦИПЫ НАШЕЙ РАБОТЫ</h2>
                    <div className="principle__text">
                        <p>Мы выполним заказ под ключ, обеспечив доставку и монтаж мебели по адресу заказчика.
                            У нас работают опытные сборщики, выполняющие свои обязанности ответственно и
                            качественно. Они подключат дополнительное оборудование и проверят, как оно будет
                            функционировать.
                        </p>
                        <p>На все виды работ мы предоставим свои гарантии. Сочетание всех преимуществ, которыми
                            располагает наша компания, обеспечивает высокую репутацию нашей продукции. При
                            разработке каждого проекта наши дизайнеры применяют программы 3-Д моделирования.
                            Любой
                            заказчик сможет увидеть проект и оценить, как будет выглядеть выбранная им мебель в
                            помещении. Только после его одобрения мы направим заказ в работу
                            и обеспечим его выполнение в разумные сроки.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
}
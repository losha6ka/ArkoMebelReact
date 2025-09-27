import { FC } from "react";
import aboutus1 from "../../img/aboutus/01.jpg"
import aboutus2 from "../../img/aboutus/02.jpg"
import aboutus3 from "../../img/aboutus/03.jpg"
import aboutus4 from "../../img/aboutus/04.jpg"
export const InfoComponent: FC = () => {
    return <section className="main-aboutus aboutus">
        <div className="aboutus__container">
            <h2 className="aboutus__title page-title">О НАС</h2>
            <div className="aboutus__items">
                <div className="aboutus__item">
                    <div className="aboutus__body">
                        <div className="aboutus__body-title page-title">Добро пожаловать в магазин Арко Мебель!
                        </div>
                        <div className="aboutus__body-text">
                            <p>Мы являемся прямыми поставщиками более чем тридцати фабрик.
                                Наша компания уже более 5 лет успешно занимается продажей кухонной и корпусной
                                мебели, вернее даже будет сказать что в первую очередь мы не продаем, а
                                стараемся помочь нашим клиентам с выбором.</p>
                        </div>
                    </div>
                    <div className="aboutus__img"><img src={aboutus1} alt="" /></div>
                </div>
                <div className="aboutus__item">
                    <div className="aboutus__body">
                        <div className="aboutus__body-text">
                            <p>Политика компании - это максимальная клиентоориентированность, в любой спорной
                                ситуации, которые бывают редко, но как и у всех бывают, мы всегда принимаем
                                сторону клиента и даже когда фабрика не идет
                                к нам на встречу мы решаем вопросы самостоятельно за свой счет. По этой, а так
                                же по множеству других причин наши клиенты возвращаются к нам снова.
                                Мы гордимся тем, что на данный момент больше половины клиентов которые к нам
                                приходят это те кто либо заказывали у нас ранее либо их друзья (родственники).
                                На сайте а так же на Яндекс и на Гугл много настоящих положительных отзывов о
                                нашей работе.</p>
                        </div>
                    </div>
                    <div className="aboutus__img"><img src={aboutus2} alt="" /></div>
                </div>
                <div className="aboutus__item">
                    <div className="aboutus__body">
                        <div className="aboutus__body-title">Сочетание цены и качества
                        </div>
                        <div className="aboutus__body-text">
                            <p>На данный момент рынок мебели в России хорошо развит и количество фабрик растет с
                                каждым годом. Из этого огромного количества производителей за 5 лет нашей работы
                                мы постарались собрать у себя
                                в ассортименте тех у которых сочетание цены и качества будет самым хорошим. </p>
                        </div>
                    </div>
                    <div className="aboutus__img"><img src={aboutus3} alt="" /></div>
                </div>
                <div className="aboutus__item">
                    <div className="aboutus__body">
                        <div className="aboutus__body-title page-title">На ряду с продажей мебели мы предлагаем ряд
                            услуг:
                        </div>
                        <ul className="aboutus__body-list">
                            <li className="aboutus__body-item">Составить дизайн проект кухни по Вашим размерам - это
                                бесплатная услуга и предоставляется всем желающим даже в телефонном режиме.
                            </li>
                            <li className="aboutus__body-item">Замер помещения (для кухонь) - это платная услуга
                                стоимость уточняется у менеджеров. Перед тем как делать замер желательно
                                определиться с моделью кухни, сделать вместе с нашими менеджерами
                                предварительный проект и просчет, после чего уже вызывать замерщика.
                            </li>
                            <li className="aboutus__body-item">Сборка мебели. У нас в штате есть проверенные
                                квалифицированные сборщики за работу которых мы несем ответственность. Услуга
                                сборки так же является платной, ознакомиться с расценками на сборку Вы можете на
                                странице: <a href="">Сборка</a></li>
                        </ul>
                    </div>
                    <div className="aboutus__img"><img src={aboutus4} alt="" /></div>
                </div>
            </div>
        </div>
    </section>
}
import { FC, useState } from "react";
import kitchen1 from "../../img/kitchen-product/01.jpg"
import kitchen2 from "../../img/kitchen-product/02.jpg"
import kitchen3 from "../../img/kitchen-product/03.jpg"
import kitchen4 from "../../img/kitchen-product/04.jpg"
import portfolio2 from "../../img/portfolio/02.jpg"
const kitchens = [kitchen1, kitchen2, kitchen3, kitchen4, kitchen1, kitchen2, kitchen1, kitchen2, kitchen3, kitchen4, kitchen3, kitchen4, kitchen1, kitchen2]
const anothers = [portfolio2, portfolio2, portfolio2, portfolio2, portfolio2, portfolio2]
export const OurworksComponent: FC = () => {
    const [activeSection, setActiveSection] = useState<"kitchen" | "another">("kitchen")
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPagesKitchen = Math.ceil(kitchens.length / 6);
    const totalPagesAnother = Math.ceil(anothers.length / 6);
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);

    };
    const getProductsForCurrentPage = (kitchen: boolean) => {
        const startIndex = (currentPage - 1) * 6;
        if (kitchen) {
            return kitchens.slice(startIndex, startIndex + 6);
        }
        return anothers.slice(startIndex, startIndex + 6);
    };
    return <section className="main-ourworks ourworks">
        <div className="ourworks__container">
            <h2 className="ourworks__title page-title">НАШИ РАБОТЫ</h2>
            <div className="ourworks__tab">
                <div className="ourworks__item">
                    <button className={activeSection === "kitchen" ? "ourworks__tablinks active" : "ourworks__tablinks"}
                        onClick={() => {
                            setActiveSection("kitchen")
                            setCurrentPage(1)
                        }}>
                        КУХНИ
                    </button>
                    <button className={activeSection === "another" ? "ourworks__tablinks active" : "ourworks__tablinks"}
                        onClick={() => {
                            setActiveSection("another")
                            setCurrentPage(1)
                        }}>
                        ДРУГАЯ МЕБЕЛЬ
                    </button>
                </div>
                <div className="ourworks__tabcontent">
                    {activeSection === "kitchen"
                        ? <div className="ourworks__body ">
                            {getProductsForCurrentPage(true)?.map((kitchen, index) => (
                                <div key={index} className="ourworks__img"><a href="kitchen.html"><img src={kitchen}
                                    alt="" /></a>
                                </div>
                            ))}
                        </div>
                        : <div id="partners" className="ourworks__tabcontent">
                            <div className="ourworks__body-partners">
                                {getProductsForCurrentPage(false)?.map((portfolio) => (
                                    <div className="ourworks__img"><a href="kitchen.html"><img src={portfolio}
                                        alt="" /></a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    <div className="ourworks__item-body">
                        {activeSection === "kitchen" ?
                            Array.from({ length: totalPagesKitchen }, (_, i) => i + 1).map((page: number) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={page === currentPage ? "ourworks__tablinks-body active" : "ourworks__tablinks-body"}>
                                    {page}
                                </button>
                            ))
                            : Array.from({ length: totalPagesAnother }, (_, i) => i + 1).map((page: number) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={page === currentPage ? "ourworks__tablinks-body active" : "ourworks__tablinks-body"}>
                                    {page}
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </section>
}
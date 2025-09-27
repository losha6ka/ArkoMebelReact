import { FC } from "react";
import ProductCard from "../main/PopProductHOC";

interface MainInterestingProps {
    id: number;
    name: string;
    price: string;
    oldPrice?: string;
    discount?: string;
    hit?: boolean;
    product?: any;
    sizes?: { width: string; height: string; depth: string };
}

export const MainInteresting: FC<MainInterestingProps> = ({
    id,
    name,
    price,
    oldPrice,
    discount,
    sizes,
    hit,
    product,
}) => {
    return <section className="main-insteresting insteresting">
        <div className="insteresting__container">
            <h4 className="insteresting__title page-title">ВОЗМОЖНО ВАС ЗАИНТЕРЕСУЕТ</h4>
            <div className="insteresting__items product__items">
                <ProductCard
                    key={id}
                    id={id}
                    name={name}
                    price={price}
                    oldPrice={oldPrice}
                    discount={discount}
                    sizes={sizes}
                    product={product}
                    hit={hit}
                />
            </div>
        </div>

    </section>
}
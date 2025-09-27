import { FC } from "react";
import "../../SCSS/main.scss"
import { Benefits } from "./Benefits";
import { SliderMain } from "./SliderMain";
import { Cataloge } from "./Cataloge";
import { PopularProduct } from "./PopularProduct";
import { Category } from "./Category";
import { Action } from "./Action";
import { Portfolio } from "./Portfolio";
import { Contacts } from "./Contacts";
import { Social } from "./Social";

export const Main: FC = () => {
    return <main className="main">
        <SliderMain />
        <Benefits />
        <Cataloge />
        <PopularProduct />
        <Category />
        <Action />
        <Portfolio />
        <Contacts />
        <Social />
    </main >
}
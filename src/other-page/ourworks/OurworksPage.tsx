import { FC } from "react";
import { Header } from "../../main-page/header/Header";
import { Breadcrumbs } from "../../main-page/Breadcrumbs";
import { Footer } from "../../main-page/footer/Footer";
import { Social } from "../../main-page/main/Social";
import { Question } from "../action/Question";
import { Principle } from "./Principle";
import { OurworksComponent } from "./OurworksComponent";

export const OurworksPage: FC = () => {
    return <div className="wrapper">
        <Header />
        <Breadcrumbs />
        <OurworksComponent />
        <Principle />
        <Question />
        <Social />
        <Footer />
    </div>
}

export default OurworksPage
import { FC } from "react";
import { Header } from "../../main-page/header/Header";
import { Footer } from "../../main-page/footer/Footer";
import { Benefits } from "../../main-page/main/Benefits";
import { Question } from "../action/Question";
import { Social } from "../../main-page/main/Social";
import { InfoComponent } from "./InfoComponent";
import { Breadcrumbs } from "../../main-page/Breadcrumbs";

export const InfoPage: FC = () => {
    return <div className="wrapper">
        <Header menu={true} />
        <Breadcrumbs />
        <InfoComponent />
        <Benefits />
        <Question />
        <Social />
        <Footer />
    </div>
}

export default InfoPage
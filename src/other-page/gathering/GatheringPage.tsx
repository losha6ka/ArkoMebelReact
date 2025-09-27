import { FC } from "react";
import { Social } from "../../main-page/main/Social";
import { Footer } from "../../main-page/footer/Footer";
import { Header } from "../../main-page/header/Header";
import { Breadcrumbs } from "../../main-page/Breadcrumbs";
import { GatheringComponent } from "./GatheringComponent";

export const GatheringPage: FC = () => {
    return <div className="wrapper">
        <Header menu={true} />
        <Breadcrumbs />
        <GatheringComponent />
        <Social />
        <Footer />
    </div>
}
export default GatheringPage
import { FC } from "react";
import { Header } from "../../main-page/header/Header";
import { Footer } from "../../main-page/footer/Footer";
import { Contacts } from "../../main-page/main/Contacts";
import { Social } from "../../main-page/main/Social";
import { Breadcrumbs } from "../../main-page/Breadcrumbs";
import { DeliveryComponent } from "./DeliveryComponent";

const DeliveryPage: FC = () => {
    return <div className="wrapper">
        <Header menu={true} />
        <Breadcrumbs />
        <DeliveryComponent />
        <Contacts />
        <Social />
        <Footer />
    </div>
}

export default DeliveryPage
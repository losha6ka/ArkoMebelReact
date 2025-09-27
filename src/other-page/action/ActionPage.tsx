import { FC } from "react";
import { Header } from "../../main-page/header/Header";
import { Footer } from "../../main-page/footer/Footer";
import { Contacts } from "../../main-page/main/Contacts";
import { Breadcrumbs } from "../../main-page/Breadcrumbs";
import { Question } from "./Question";
import { Action } from "../../main-page/main/Action";


export const ActionPage: FC = () => {
    return <div className="wrapper">
        <Header menu={true} />
        <Breadcrumbs />
        <Action actionComponent={true} />
        <Question />
        <Contacts />
        <Footer />
    </div>
}

export default ActionPage
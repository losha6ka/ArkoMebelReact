import { FC } from "react";
import { Header } from "../../main-page/header/Header";
import { Footer } from "../../main-page/footer/Footer";
import { Breadcrumbs } from "../../main-page/Breadcrumbs";
import { Social } from "../../main-page/main/Social";
import { Contacts } from "../../main-page/main/Contacts";
import { ContactsComponent } from "./ContactsComponent";


export const ContactsPage: FC = () => {
    return <div className="wrapper">
        <Header />
        <Breadcrumbs />
        <ContactsComponent />
        <Contacts />
        <Social />
        <Footer />
    </div>
}

export default ContactsPage
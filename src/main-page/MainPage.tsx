import { FC } from "react";
import { Header } from "./header/Header";
import { Main } from "./main/Main";
import { Footer } from "./footer/Footer";
import '../SCSS/style.scss';

export const MainPage: FC = () => {
    return <div className="wrapper">
        <Header menu={true} />
        <Main />
        <Footer />
    </div>
}
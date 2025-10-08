import { FC } from "react";
import "../../SCSS/header.scss"
import { HeaderContainer } from "./HeaderContainer";
import { HeaderBot } from "./HeaderBot";
import { useSelector } from "react-redux";
interface HeaderProps {
    menu?: boolean
}
export const Header: FC<HeaderProps> = ({ menu }) => {
    const logged = useSelector((state: any) => state.auth.isLoggedIn)
    const name = useSelector((state: any) => state.auth.name)
    return <header className="header">
        <HeaderContainer
            name={name}
            logged={logged} />
        {menu === true && <HeaderBot />}
    </header >
}
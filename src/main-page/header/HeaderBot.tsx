import { FC, useState } from "react";
import { HeaderMenuHOC } from "./HeaderMenuHOC";
import { Link } from "react-router-dom";

export const HeaderBot: FC = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const handleClickMenu = (id: string) => {
        setActiveSection(prev => (prev === id ? null : id));
    };
    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setActiveSection(null);
        }
    };
    return <div className="header__bott bott-header">
        <div tabIndex={0} className="bott-header__items" onBlur={handleBlur}>
            <HeaderMenuHOC variant="bottom" activeSection={activeSection} handleClickMenu={handleClickMenu} />
            <div className="bott-header__actions">
                <Link to={"/cataloge"} className="bott-header__button">ГДЕ ПОСМОТРЕТЬ</Link>
            </div>
        </div>
    </div>
}
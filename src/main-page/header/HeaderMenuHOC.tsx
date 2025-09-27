import { Link } from "react-router-dom";

const sections = [
    { id: "kitchen", title: "КУХНИ" },
    { id: "livroom", title: "ГОСТИННЫЕ" },
    { id: "bedroom", title: "СПАЛЬНИ" },
    { id: "hallways", title: "ПРИХОЖИЕ" },
    { id: "closets", title: "ШКАФЫ-КУПЕ" },
    { id: "nursery", title: "ДЕТСКИЕ" },
    { id: "sofas", title: "ДИВАНЫ" },
];

const menuElement = [
    "Модульные кухни",
    "Готовые комплекты",
    "Маленькие кухни",
    "Угловые кухни",
    "Кухонные уголки",
    "Столы кухонные",
    "Стулья для кухни",
    "Комплектующие",
];

interface HeaderMenuProps {
    id: string;
    title: string;
    icon?: boolean;
    activeSection: string | null;
    onClick: (id: string) => void;
    variant: "header" | "bottom";
}

const Menu = ({ id, title, activeSection, onClick, variant, icon }: HeaderMenuProps) => {
    const isActive = activeSection === id;

    // Подбор классов в зависимости от места использования
    const rootClass = variant === "header" ? "top-header__spoiler" : "bott-header__item";
    const titleClass =
        variant === "header"
            ? icon
                ? `top-header__element-${id} top-header__element ${isActive ? "active" : ""}`
                : `top-header__element ${isActive ? "active" : ""}`
            : `bott-header__title ${isActive ? "active" : ""}`;

    const listClass =
        variant === "header"
            ? icon
                ? `top-header__content top-header__content-${id} ${isActive ? "active" : ""}`
                : `top-header__content ${isActive ? "active" : ""}`
            : `bott-header__list ${isActive ? "active" : ""}`;

    const liClass = variant === "header" ? "top-header__li" : "bott-header__li";
    const linkClass = variant === "header" ? "top-header__page" : "bott-header__link";

    return (
        <div className={rootClass}>
            <h2 onClick={() => onClick(id)} className={titleClass}>
                {title}
            </h2>
            <ul className={listClass}>
                {menuElement.map((item, index) => (
                    <li key={index} className={liClass}>
                        <Link to="/kitchen" className={linkClass}>
                            {item}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const HeaderMenuHOC = ({
    activeSection,
    handleClickMenu,
    icon,
    variant,
}: {
    handleClickMenu: (id: string) => void;
    activeSection: string | null;
    icon?: boolean;
    variant: "header" | "bottom";
}) => {
    return (
        <>
            {sections.map(({ id, title }) => (
                <Menu
                    key={id}
                    id={id}
                    title={title}
                    activeSection={activeSection}
                    onClick={handleClickMenu}
                    variant={variant}
                    icon={icon}
                />
            ))}
        </>
    );
};

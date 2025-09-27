import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const buttonStyle: React.CSSProperties = {
        position: "fixed",
        bottom: "24px",
        right: "24px",
        padding: "16px",
        borderRadius: "50%",
        background: visible
            ? "#384685" // градиент фона
            : "transparent",
        color: "white",
        border: "none",
        cursor: "pointer",
        boxShadow: visible
            ? "0 4px 15px rgba(0, 0, 0, 0.3)"
            : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
    };

    const hoverStyle: React.CSSProperties = {
        background: "#384685",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
        opacity: "0.9",
        transform: "scale(1.1)",
        transition: "all 0.3s ease",
    };

    const [isHover, setIsHover] = useState(false);

    return (
        <button
            onClick={scrollToTop}
            style={isHover ? { ...buttonStyle, ...hoverStyle } : buttonStyle}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <ChevronUp size={24} strokeWidth={2.5} />
        </button>
    );
};

export default ScrollToTopButton;

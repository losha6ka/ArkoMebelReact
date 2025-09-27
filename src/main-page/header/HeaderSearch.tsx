import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import debounce from "lodash.debounce";
import findSVG from "../../img/icons/find.svg";

interface Product {
    id: string;
    name: string;
    type: "product";
}

const HeaderSearch = () => {
    const [queryText, setQueryText] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const navigate = useNavigate();

    // 🔹 Запрос к Firestore
    const fetchData = async (text: string) => {
        if (!text.trim()) {
            setResults([]);
            return;
        }

        try {
            const productsQuery = query(collection(db, "products"),
                where("nameLowercase", ">=", text.toLowerCase()),
                where("nameLowercase", "<=", text.toLowerCase() + "\uf8ff")
            );

            const productsSnap = await getDocs(productsQuery);

            const products = productsSnap.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
                type: "product" as const,
            }));

            setResults([...products]);
        } catch (error) {
            console.error("Ошибка при поиске:", error);
        }
    };

    // 🔹 debounce (чтобы не долбить Firestore на каждый символ)
    const debouncedFetch = useCallback(
        debounce((text: string) => {
            fetchData(text);
        }, 300),
        []
    );

    useEffect(() => {
        debouncedFetch(queryText);
    }, [queryText, debouncedFetch]);

    const handleSelect = (item: Product) => {
        setQueryText("");
        setResults([]);
        navigate(`/${item.type}/${item.id}`);
    };
    return (
        <div className="mid-header__find">
            <form action="#" onSubmit={(e) => e.preventDefault()}>
                <input
                    className="mid-header__find-input"
                    type="text"
                    placeholder="Поиск"
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                />
                <img className="mid-header__find-icon" src={findSVG} alt="search" />
            </form>

            {/* 🔹 Выпадающий список результатов */}
            {results.length > 0 && (
                <ul className="mid-header__find-results">
                    {results.map((item) => (
                        <li
                            key={item.id}
                            className="mid-header__find-item"
                            onClick={() => handleSelect(item)}
                        >
                            {item.name} <span className="mid-header__find-type">({item.type === "product" && "Кухни"})</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HeaderSearch;

import { useAuth } from "./hooks/authHook";
import products from "./firebase/mockData.json"; // импорт твоего json (лежит в src)
import { uploadAllProducts } from "./firebase/uploadProduct";

// UID администратора, у которого разрешена загрузка
const ADMIN_UID = "ZDJOcDWvoJPiGo2TwJRmpf7IHsN2";

export const LoadProductMOCK = () => {
    const { uid } = useAuth();

    const handleUpload = async () => {
        if (!uid) {
            alert("Сначала войдите в аккаунт");
            return;
        }

        if (uid !== ADMIN_UID) {
            alert("У вас нет прав на загрузку товаров!");
            return;
        }

        try {
            await uploadAllProducts(uid, products);
            alert("✅ Все товары успешно загружены в Firestore!");
        } catch (err) {
            console.error("Ошибка при загрузке:", err);
            alert("❌ Ошибка при загрузке данных, проверьте консоль");
        }
    };

    return (
        <button onClick={handleUpload}>
            📥 Загрузить товары в Firestore
        </button>
    );
};

import { uploadProducts } from "./firebase/uploadProduct";
import { useAuth } from "./hooks/authHook";

export const AdminPanel = () => {
    const { uid } = useAuth();

    const handleUpload = async () => {
        if (uid) {
            await uploadProducts(uid);
        } else {
            alert("Сначала войдите в аккаунт");
        }
    };

    return (
        <button onClick={handleUpload}>
            📥 Загрузить товары в Firestore
        </button>
    );
};

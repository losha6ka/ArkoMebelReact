import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

// Загружаем твои товары из mock (можно вставить прямо JSON)

const ADMIN_UID = "ZDJOcDWvoJPiGo2TwJRmpf7IHsN2"; // твой UID из правил
interface Product {
    image: string,
    name: string,
    price: string | number,
    oldPrice?: string | number,
    hit?: boolean,
    discount?: string,
    stars?: number,
    characteristics: any[],
    delivery: any[],
    description: string[],
    material: any[],
    module: any[]

}
// 🚀 Функция для загрузки товаров
export const uploadProducts = async (userId: string, product: any) => {
    if (userId !== ADMIN_UID) {
        console.error("❌ У вас нет прав на загрузку товаров");
        return;
    }

    try {
        // Используем setDoc вместо addDoc, чтобы избежать дубликатов
        const ref = doc(collection(db, "products"), crypto.randomUUID());
        await setDoc(ref, { ...product, nameLowercase: product.name.toLowerCase() }, { merge: true });
        console.log(`✅ Загружен товар: ${product.name}`);


        console.log("🎉 Все товары успешно загружены");
    } catch (error) {
        console.error("❌ Ошибка при загрузке:", error);
    }
};

import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const ADMIN_UID = "ZDJOcDWvoJPiGo2TwJRmpf7IHsN2";

/** Простая проверка — это обычный объект (не массив, не null) */
const isPlainObject = (v: any) =>
    typeof v === "object" && v !== null && !Array.isArray(v);

/** Массив состоит только из строк? */
const isArrayOfStrings = (arr: any[]) =>
    Array.isArray(arr) && arr.every((i) => typeof i === "string");

/** Массив состоит из объектов? */
const isArrayOfObjects = (arr: any[]) =>
    Array.isArray(arr) && arr.every((i) => isPlainObject(i));

/**
 * Рекурсивно проходит объект товара и гарантирует наличие id
 * только для элементов-модельных сущностей (объекты в массивах).
 *
 * Правила:
 * - Если поле — массив строк (images) → не трогаем.
 * - Если поле — массив объектов → добавляем id каждому объекту (если ещё нет) и рекурсивно проходим его.
 * - Если поле — объект (не массив) → рекурсивно проходим его (но не добавляем id автоматически).
 * - НЕ добавляем id к простым полям (string/number/boolean).
 */
function ensureChildIds(obj: any): any {
    if (!isPlainObject(obj)) return obj;

    const res: any = { ...obj };

    for (const key of Object.keys(res)) {
        const val = res[key];

        if (Array.isArray(val)) {
            if (isArrayOfStrings(val)) {
                // массив строк, например images
                res[key] = val;
            } else if (isArrayOfObjects(val)) {
                // массив объектов — нуждаемся в id для каждого элемента
                res[key] = val.map((item: any) => {
                    const newItem = { ...(isPlainObject(item) ? item : {}) };
                    if (!newItem.id) newItem.id = crypto.randomUUID();
                    // рекурсивно обработаем вложенные поля внутри этого элемента
                    return ensureChildIds(newItem);
                });
            } else {
                // смешанный массив — рекурсивно обрабатываем элементы по возможности
                res[key] = val.map((it: any) =>
                    isPlainObject(it) ? ensureChildIds(it) : it
                );
            }
        } else if (isPlainObject(val)) {
            // объект — просто рекурсивно обработаем
            res[key] = ensureChildIds(val);
        } else {
            // простое поле (string/number/boolean/null/undefined)
            res[key] = val;
        }
    }

    return res;
}

/**
 * Загружает один товар в Firestore.
 * - productRoot.id будет сгенерирован и записан
 * - slug будет проигнорирован/удален
 */
export const uploadProduct = async (userId: string, product: any) => {
    if (userId !== ADMIN_UID) {
        console.error("❌ У вас нет прав на загрузку товаров");
        return;
    }

    try {
        // создаём уникальный id для товара (используем как документ id и как поле id в объекте)
        const productId = crypto.randomUUID();

        // Копируем продукт чтобы не мутировать исходник
        const pCopy = { ...product };

        // Удаляем slug если есть (ты попросил убрать)
        if ("slug" in pCopy) delete pCopy.slug;

        // Обеспечиваем id для вложенных сущностей (modules, tables, delivery, product.colors и т.д.)
        const productWithChildIds = ensureChildIds(pCopy);

        // Записываем id корневого товара
        productWithChildIds.id = productId;

        // Добавляем поле для поисковой сортировки
        productWithChildIds.nameLowercase = (productWithChildIds.name || "").toLowerCase();

        // Создаём документ с id = productId
        const productRef = doc(collection(db, "products"), productId);
        await setDoc(productRef, productWithChildIds, { merge: true });

        console.log(`✅ Загружен товар: ${productWithChildIds.name} (id=${productId})`);
    } catch (error) {
        console.error("❌ Ошибка при загрузке:", error);
    }
};

/**
 * Массовая загрузка
 */
export const uploadAllProducts = async (userId: string, products: any[]) => {
    if (!Array.isArray(products)) {
        console.error("❌ products должен быть массивом");
        return;
    }

    for (const product of products) {
        await uploadProduct(userId, product);
    }

    console.log("🎉 Все товары успешно загружены");
};

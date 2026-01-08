import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { AppDispatch } from "../store";
import { db } from "../../firebase/firebase";
import { setCurrentKitchen, setKitchen, setKitchenLoading } from "../reducers/kitchenReducer";

export const fetchKitchenToFirestore = () => async (dispatch: AppDispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "products")); //kitchen
        const products = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        dispatch(setKitchen(products));
    } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
    } finally {
        dispatch(setKitchenLoading(false))
    }
};

export const fetchProductToFirestoreById = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const ref = doc(db, "products", id); //kitchen
        const snap = await getDoc(ref);
        if (snap.exists()) {
            dispatch(setCurrentKitchen({ id: snap.id, ...snap.data() }));
        } else {
            console.warn("Товар не найден");
        }
    } catch (error) {
        console.error("Ошибка при загрузке товара:", error);
    } finally {
        dispatch(setCurrentKitchen(false))
    }
};
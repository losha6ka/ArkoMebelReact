import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { AppDispatch } from "../store";
import { db } from "../../firebase/firebase";
import { setCurrentProduct, setProduct, setProductLoading } from "../reducers/cardReducer";

export const fetchProductToFirestore = () => async (dispatch: AppDispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        dispatch(setProduct(products));
    } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
    } finally {
        dispatch(setProductLoading(false))
    }
};

export const fetchProductToFirestoreById = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const ref = doc(db, "products", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
            dispatch(setCurrentProduct({ id: snap.id, ...snap.data() }));
        } else {
            console.warn("Товар не найден");
        }
    } catch (error) {
        console.error("Ошибка при загрузке товара:", error);
    } finally {
        dispatch(setProductLoading(false))
    }
};
import { AppDispatch, RootState } from "../store";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { setCart } from "../reducers/cartReducer";

export const fetchCartFromFirestore = (uid: string) => async (dispatch: AppDispatch) => {
    try {
        const ref = doc(db, "carts", uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
            dispatch(setCart(snap.data().items || []));
        }
    } catch (error) {
        console.error(`Ошибка при загрузке корзины: ${error}`)
    }

};

export const saveCartToFirestore = (uid: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        const { cart } = getState();
        await setDoc(doc(db, "carts", uid), {
            items: cart.items
        });
    } catch (error) {
        console.error(`Ошибка при сохранении корзины: ${error}`)
    }

};

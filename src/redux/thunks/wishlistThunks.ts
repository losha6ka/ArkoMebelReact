import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { AppDispatch, RootState } from "../store";
import { setWishlist } from "../reducers/wishlistReducer";



export const fetchWishlistFromFirestore = (uid: string) => async (dispatch: AppDispatch) => {
    try {
        const ref = doc(db, "wishlists", uid)
        const snap = await getDoc(ref)
        if (snap.exists()) {
            dispatch(setWishlist(snap.data().items || []))
        }
    } catch (error) {
        console.error(`Ошибка при загрузке желаемого: ${error}`)
    }
}

export const saveWishlistToFirestore = (uid: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        const { wishlist } = getState()
        await setDoc(doc(db, "wishlists", uid), {
            items: wishlist.items
        })
    } catch (error) {
        console.error(`Ошибка при сохранении желаемого: ${error}`)
    }
}
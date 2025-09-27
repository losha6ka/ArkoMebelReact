import { AppDispatch, RootState } from "../store";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { setOrders } from "../reducers/ordersReducer";

export const fetchOrdersFromFirestore = (uid: string) => async (dispatch: AppDispatch) => {
    try {
        const q = query(collection(db, "orders"), where("userId", "==", uid));
        const snapshot = await getDocs(q);

        const ordersData = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                items: data.items,
                total: data.total,
                status: data.status,
                createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
            };
        });

        dispatch(setOrders(ordersData));
    } catch (error) {
        console.error("Ошибка при загрузке заказов:", error);
    }
};

export const placeOrder = (uid: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        const { cart } = getState();
        const orderData = {
            userId: uid,
            items: cart.items,
            payment: cart.payment,
            createdAt: serverTimestamp(), // ✅ правильный вариант
            total: cart.items.reduce((sum, item: any) => {
                const numericPrice = typeof item.price === "number"
                    ? item.price
                    : parseInt(item.price.replace(/\s|грн\.?/gi, ""), 10);
                return sum + numericPrice * item.quantity;
            }, 0),

            status: "pending",
        };
        await addDoc(collection(db, "orders"), orderData);
    } catch (error) {
        console.error("Ошибка оформления заказа:", error);
    }
};

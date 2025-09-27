import { collection, query, where, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { AppDispatch, RootState } from "../store";
import { db } from "../../firebase/firebase";
import { setComments } from "../reducers/commentReducer";


// 🔹 Загрузка отзывов по продукту
export const fetchCommentsByProduct = (productId: string) => async (dispatch: AppDispatch) => {
    try {
        const q = query(collection(db, "reviews"), where("productId", "==", productId));
        const snap = await getDocs(q);

        const comments = snap.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                userId: data.userId,
                name: data.name,
                productId: productId,
                text: data.text,
                stars: data.stars,
                photo: data.photo,
                createdAt: data.createdAt?.toDate().toISOString(),
            };
        });

        dispatch(setComments(comments));
    } catch (error) {
        console.error("Ошибка при загрузке отзывов по продукту:", error);
    }
};

// 🔹 Загрузка отзывов пользователя
export const fetchCommentsByUser = (uid: string) => async (dispatch: AppDispatch) => {
    try {
        const q = query(collection(db, "reviews"), where("userId", "==", uid));
        const snap = await getDocs(q);

        const comments = snap.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                userId: uid,
                name: data.name,
                productId: data.productId,
                text: data.text,
                stars: data.stars,
                photo: data.photo,
                createdAt: data.createdAt?.toDate().toISOString(),
            };
        });

        dispatch(setComments(comments));
    } catch (error) {
        console.error("Ошибка при загрузке отзывов пользователя:", error);
    }
};

export const saveCommentToFirestore = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        const { auth, comment } = getState();
        if (!auth.uid) throw new Error("Пользователь не авторизован");
        const newComment = comment.items[0];
        if (!newComment) throw new Error("Комментарий пустой");

        await addDoc(collection(db, "reviews"), {
            userId: auth.uid,
            name: newComment.name ?? auth.name ?? "Аноним",
            productId: newComment.productId,
            text: newComment.text,
            stars: newComment.stars,
            photo: newComment.photo ?? null,
            createdAt: Timestamp.now(),
        });

    } catch (error) {
        console.error(`Ошибка при отправке отзыва: ${error}`);
    }
};

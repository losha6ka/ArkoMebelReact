import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../firebase/firebase';
import { setLoading, logoutUser, setUser } from '../../redux/reducers/authReducer';
import { fetchCartFromFirestore } from "../../redux/thunks/cartThunks";
import { fetchWishlistFromFirestore } from "../../redux/thunks/wishlistThunks";
import { clearCart } from '../../redux/reducers/cartReducer';
import { clearWishlist } from '../../redux/reducers/wishlistReducer';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';

const AuthObserver = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                dispatch(clearCart());
                dispatch(clearWishlist());

                const userDoc = await getDoc(doc(db, "users", user.uid));
                const data = userDoc.exists() ? userDoc.data() : {};

                dispatch(setUser({ uid: user.uid, email: user.email!, name: data.name, phone: data.phone }));
                dispatch(fetchCartFromFirestore(user.uid));
                dispatch(fetchWishlistFromFirestore(user.uid));
            } else {
                dispatch(logoutUser());
                dispatch(clearCart());
                dispatch(clearWishlist());
            }

            dispatch(setLoading({ isLoading: false }));
        });

        return () => unsubscribe();
    }, [dispatch]);

    return null;
};

export default AuthObserver;

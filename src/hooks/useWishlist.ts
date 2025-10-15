import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { addToWishlist, removeFromWishlist } from "../redux/reducers/wishlistReducer";
import { saveWishlistToFirestore } from "../redux/thunks/wishlistThunks";
import { useAuth } from "./authHook";

interface WishlistItem {
    id: string;
    name: string;
    price: number;
    link: string;
    image: string;
}

export const useWishlist = () => {
    const { uid } = useAuth();
    const dispatch = useDispatch<AppDispatch>();
    const wishlist = useSelector((state: RootState) => state.wishlist.items);

    const getUniqId = (name: string, id: string | number) => name + id?.toString();

    const isWishlistId = (name: string, id: string | number) => {
        const uniqId = getUniqId(name, id);
        return wishlist.some((item) => item?.id === uniqId);
    };

    const handleAddToWishlist = ({ id, name, price, link, image }: WishlistItem) => {
        const uniqId = getUniqId(name, id);
        if (uid) {
            if (!isWishlistId(name, id)) {
                dispatch(addToWishlist({ id: uniqId, name, price, link, image }));
            } else {
                dispatch(removeFromWishlist(uniqId));
            }
            dispatch(saveWishlistToFirestore(uid));
        }
    };

    return {
        wishlist,
        isWishlistId,
        handleAddToWishlist,
    };
};

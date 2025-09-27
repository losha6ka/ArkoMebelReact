import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface wishlistState {
    id: string;
    name: string;
    price: number | string;
    link: string;
    image?: string;
}

interface initialStateTS {
    items: wishlistState[]
    loading: boolean
}

const initialState: initialStateTS = {
    items: [],
    loading: true
}

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishlist(state, action: PayloadAction<wishlistState[]>) {
            state.items = action.payload
        },
        addToWishlist(state, action: PayloadAction<wishlistState>) {
            const exists = state.items.find((item) => item.id === action.payload.id)
            if (!exists) {
                state.items.push(action.payload)
            }
        },
        removeFromWishlist(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.id !== action.payload)
        },
        clearWishlist(state) {
            state.items = [];
        },
    }
})

export const { setWishlist, addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
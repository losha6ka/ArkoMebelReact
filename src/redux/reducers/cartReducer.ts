// redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    link: string;
    image?: string;
}

interface CartState {
    items: CartItem[];
    payment: string
}

const initialState: CartState = {
    items: [],
    payment: ""
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart(state, action: PayloadAction<CartItem[]>) {
            state.items = action.payload;
        },
        addToCart(state, action: PayloadAction<CartItem>) {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push(action.payload);
            }
        },
        incrementQuantity(state, action: PayloadAction<string | number>) {
            const existingItem = state.items.find((item) => item.id === action.payload);
            if (existingItem) {
                existingItem.quantity += 1
            }
        },
        decrementQuantity(state, action: PayloadAction<string | number>) {
            const existingItem = state.items.find((item) => item.id === action.payload);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearCart(state) {
            state.items = [];
        },

    },

});

export const { addToCart, removeFromCart, clearCart, setCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;

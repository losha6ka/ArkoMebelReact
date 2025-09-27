import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface CardState {
    items: any[];
    currentProduct: any | null;
    isLoading: boolean;
    activeColor: string | null;
}

const initialState: CardState = {
    items: [],
    currentProduct: null,
    isLoading: true,
    activeColor: null,
};


const cardSlice = createSlice({
    name: "card",
    initialState: initialState,
    reducers: {
        setProduct(state, action: PayloadAction<any>) {
            state.items = action.payload
        },
        setCurrentProduct: (state, action: PayloadAction<any>) => {
            state.currentProduct = action.payload;
        },
        addActiveColor(state, action: PayloadAction<string>) {
            state.activeColor = action.payload
        },
        setProductLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        }
    },
})
export const { addActiveColor, setProduct, setCurrentProduct, setProductLoading } = cardSlice.actions
export default cardSlice.reducer;
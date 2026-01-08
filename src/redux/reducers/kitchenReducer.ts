import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface CardState {
    items: any[];
    currentKitchen: any | null;
    isLoading: boolean;
    activeColor: string | null;
}

const initialState: CardState = {
    items: [],
    currentKitchen: null,
    isLoading: true,
    activeColor: null,
};

const kitchenSlice = createSlice({
    name: "kitchen",
    initialState: initialState,
    reducers: {
        setKitchen(state, action: PayloadAction<any>) {
            state.items = action.payload
        },
        setCurrentKitchen: (state, action: PayloadAction<any>) => {
            state.currentKitchen = action.payload;
        },
        addActiveColor(state, action: PayloadAction<string>) {
            state.activeColor = action.payload
        },
        setKitchenLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        }
    },

})
export const { setKitchen, setCurrentKitchen, addActiveColor, setKitchenLoading } = kitchenSlice.actions
export default kitchenSlice.reducer;
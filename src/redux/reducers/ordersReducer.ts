import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Order {
    id: string;
    items: any[];
    total: number;
    status: string;
    createdAt: any
}

interface OrdersState {
    orders: Order[];
    loading: boolean
}

const initialState: OrdersState = {
    orders: [],
    loading: true,
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders(state, action: PayloadAction<Order[]>) {
            state.orders = action.payload;
            state.loading = false
        },
        clearOrders(state) {
            state.orders = [];
            state.loading = false
        },
    },
});

export const { setOrders, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;

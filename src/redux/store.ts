import { configureStore } from '@reduxjs/toolkit';
import cardReducer from "./reducers/cardReducer"
import kitchenReducer from "./reducers/kitchenReducer"
import authReducer from "./reducers/authReducer"
import cartReducer from "./reducers/cartReducer"
import wishlistReducer from "./reducers/wishlistReducer"
import commentReducer from "./reducers/commentReducer"
import ordersReducer from "./reducers/ordersReducer"
const store = configureStore({
    reducer: {
        card: cardReducer,
        kitchen: kitchenReducer,
        auth: authReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        orders: ordersReducer,
        comment: commentReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store
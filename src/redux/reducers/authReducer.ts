// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    uid: string | null;
    email: string | null;
    name: string | null;
    phone: string | null;
    isLoggedIn: boolean;
    isLoading: boolean
}

const initialState: UserState = {
    uid: null,
    email: null,
    name: null,
    phone: null,
    isLoggedIn: false,
    isLoading: true
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ uid: string; email: string, name: string | null, phone: string | null }>) => {
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.phone = action.payload.phone;
            state.isLoggedIn = true;
        },
        setLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
            state.isLoading = action.payload.isLoading
        },
        logoutUser: (state) => {
            state.uid = null;
            state.email = null;
            state.name = null;
            state.phone = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, logoutUser, setLoading } = authSlice.actions;
export default authSlice.reducer;

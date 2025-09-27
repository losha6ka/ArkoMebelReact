import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface initialStateTS {
    data: null | any[]
    isLoading: boolean
}

const initialState: initialStateTS = {
    isLoading: true,
    data: null
}

export const fetchKitchen = createAsyncThunk("fetchKitchen", async () => {
    const data = await fetch("https://68306fadf504aa3c70f7e4c8.mockapi.io/kitchen/kitchen")
    return data.json()
})

const kitchenSlice = createSlice({
    name: "kitchen",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchKitchen.pending, (state, action) => {
            state.isLoading = true
            // console.log("LOAD")
        })
        builder.addCase(fetchKitchen.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            // console.log("OK")
        })
        builder.addCase(fetchKitchen.rejected, (state, action) => {
            console.error("ERROR")
        })
    },
})

export default kitchenSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommentTS {
    id: string;
    name: string;
    productId: string | number;
    text: string;
    stars: number;
    photo?: string | null;
}

interface initialStateTS {
    items: CommentTS[],
    loading: boolean
}

const initialState: initialStateTS = {
    items: [],
    loading: true
}

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        setComments(state, action: PayloadAction<CommentTS[]>) {
            state.items = action.payload
            state.loading = false
        },
        sendComment(state, action: PayloadAction<CommentTS>) {
            // const exists = state.items.find((item) => item.id === action.payload.id)
            // if (exists && state.items.length < 1) {
            state.items.push(action.payload)
            state.loading = false
            // }
        }
    }
})

export const { setComments, sendComment } = commentSlice.actions
export default commentSlice.reducer
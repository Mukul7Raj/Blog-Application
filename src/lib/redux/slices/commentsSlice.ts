import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Comment {
    id: number;
    body: string;
    postId: number;
    user: {
        id: number;
        username: string;
    };
}

interface CommentsState {
    items: Comment[];
    isLoading: boolean;
    error: string | null;
}

const initialState: CommentsState = {
    items: [],
    isLoading: false,
    error: null,
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        fetchCommentsRequest: (state, action: PayloadAction<number>) => {
            state.isLoading = true;
            state.error = null;
            state.items = []; // Clear previous comments
        },
        fetchCommentsSuccess: (state, action: PayloadAction<Comment[]>) => {
            state.isLoading = false;
            state.items = action.payload;
        },
        fetchCommentsFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchCommentsRequest, fetchCommentsSuccess, fetchCommentsFailure } = commentsSlice.actions;
export default commentsSlice.reducer;

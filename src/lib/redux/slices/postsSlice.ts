import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
}

interface PostsState {
    items: Post[];
    total: number; // For pagination
    currentPost: Post | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: PostsState = {
    items: [],
    total: 0,
    currentPost: null,
    isLoading: false,
    error: null,
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // Fetch All (with Pagination)
        fetchPostsRequest: (state, action: PayloadAction<{ limit?: number; skip?: number } | undefined>) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchPostsSuccess: (state, action: PayloadAction<{ posts: Post[]; total: number }>) => {
            state.isLoading = false;
            state.items = action.payload.posts;
            state.total = action.payload.total;
        },
        fetchPostsFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Search
        searchPostsRequest: (state, action: PayloadAction<string>) => {
            state.isLoading = true;
            state.error = null;
        },
        // We can reuse fetchPostsSuccess for search results as the structure matches

        fetchPostDetailRequest: (state, action: PayloadAction<number>) => {
            state.isLoading = true;
            state.error = null;
            state.currentPost = null;
        },
        fetchPostDetailSuccess: (state, action: PayloadAction<Post>) => {
            state.isLoading = false;
            state.currentPost = action.payload;
        },
        // Create
        createPostRequest: (state, action: PayloadAction<{ title: string; body: string; userId: number }>) => {
            state.isLoading = true;
            state.error = null;
        },
        createPostSuccess: (state, action: PayloadAction<Post>) => {
            state.isLoading = false;
            state.items.unshift(action.payload); // Add to top
        },
        createPostFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // Update
        updatePostRequest: (state, action: PayloadAction<{ id: number; title: string; body: string }>) => {
            state.isLoading = true;
            state.error = null;
        },
        updatePostSuccess: (state, action: PayloadAction<Post>) => {
            state.isLoading = false;
            const index = state.items.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
            if (state.currentPost?.id === action.payload.id) {
                state.currentPost = action.payload;
            }
        },
        updatePostFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // Delete
        deletePostRequest: (state, action: PayloadAction<number>) => {
            state.isLoading = true;
            state.error = null;
        },
        deletePostSuccess: (state, action: PayloadAction<number>) => {
            state.isLoading = false;
            state.items = state.items.filter(p => p.id !== action.payload);
        },
        deletePostFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure,
    searchPostsRequest,
    fetchPostDetailRequest, fetchPostDetailSuccess,
    createPostRequest, createPostSuccess, createPostFailure,
    updatePostRequest, updatePostSuccess, updatePostFailure,
    deletePostRequest, deletePostSuccess, deletePostFailure
} = postsSlice.actions;
export default postsSlice.reducer;

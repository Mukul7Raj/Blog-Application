import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null, // We will check localStorage in a "checkAuth" saga later if needed
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state, action: PayloadAction<{ username: string; password: string }>) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        },
    },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;

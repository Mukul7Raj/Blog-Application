import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

interface UIState {
    toasts: Toast[];
}

const initialState: UIState = {
    toasts: [],
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
            const id = Date.now();
            state.toasts.push({ ...action.payload, id });
        },
        removeToast: (state, action: PayloadAction<number>) => {
            state.toasts = state.toasts.filter((t) => t.id !== action.payload);
        },
    },
});

export const { addToast, removeToast } = uiSlice.actions;
export default uiSlice.reducer;

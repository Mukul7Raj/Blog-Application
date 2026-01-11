'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/rootReducer';
import { removeToast } from '@/lib/redux/slices/uiSlice';

export default function ToastContainer() {
    const dispatch = useDispatch();
    const { toasts } = useSelector((state: RootState) => state.ui);

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} dispatch={dispatch} />
            ))}
        </div>
    );
}

interface ToastItemProps {
    toast: { id: number; message: string; type: 'success' | 'error' | 'info' };
    dispatch: any; // Using any for dispatch convenience here, or could use AppDispatch
}

function ToastItem({ toast, dispatch }: ToastItemProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(removeToast(toast.id));
        }, 3000);
        return () => clearTimeout(timer);
    }, [dispatch, toast.id]);

    const colors: Record<string, string> = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-blue-600',
    };

    return (
        <div className={`${colors[toast.type]} text-white px-6 py-3 rounded-lg shadow-lg pointer-events-auto animate-fade-in-up flex items-center justify-between min-w-[300px]`}>
            <span>{toast.message}</span>
            <button onClick={() => dispatch(removeToast(toast.id))} className="ml-4 opacity-70 hover:opacity-100">✕</button>
        </div>
    );
}

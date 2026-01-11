import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from '../slices/authSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleLogin(action: PayloadAction<{ username: string; password: string }>): Generator<any, void, any> {
    try {
        const response: Response = yield call(fetch, 'https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: action.payload.username,
                password: action.payload.password,
                expiresInMins: 60, // optional
            }),
        });

        if (!response.ok) {
            const errorData: any = yield response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data: any = yield response.json();

        // Save to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            // Set cookie for middleware
            document.cookie = `token=${data.token}; path=/; max-age=${60 * 60}`;
        }

        yield put(loginSuccess(data));
    } catch (error: any) {
        // Fallback: Check for mock users (local signup)
        let foundUser = null;
        if (typeof window !== 'undefined') {
            const mockUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
            foundUser = mockUsers.find((u: any) => u.username === action.payload.username && u.password === action.payload.password);
        }

        if (foundUser) {
            // Create a fake successful response for the local user
            const fakeData = {
                id: Date.now(),
                username: foundUser.username,
                email: foundUser.email,
                firstName: foundUser.username,
                lastName: 'User',
                gender: 'unknown',
                image: 'https://dummyjson.com/icon/emilys/128', // Placeholder
                token: 'mock-jwt-token-' + Date.now(), // Fake token
            };

            if (typeof window !== 'undefined') {
                localStorage.setItem('token', fakeData.token);
                localStorage.setItem('user', JSON.stringify(fakeData));
                document.cookie = `token=${fakeData.token}; path=/; max-age=${60 * 60}`;
            }
            yield put(loginSuccess(fakeData));
            return;
        }

        yield put(loginFailure(error.message));
    }
}

export function* authSaga() {
    yield takeLatest(loginRequest.type, handleLogin);
}

import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchCommentsRequest, fetchCommentsSuccess, fetchCommentsFailure } from '../slices/commentsSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleFetchComments(action: PayloadAction<number>) {
    try {
        const response = yield call(fetch, `https://dummyjson.com/posts/${action.payload}/comments`);

        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }

        const data = yield response.json();
        yield put(fetchCommentsSuccess(data.comments));
    } catch (error: any) {
        yield put(fetchCommentsFailure(error.message));
    }
}

export function* commentsSaga() {
    yield takeLatest(fetchCommentsRequest.type, handleFetchComments);
}

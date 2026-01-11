import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure,
    searchPostsRequest,
    fetchPostDetailRequest, fetchPostDetailSuccess,
    createPostRequest, createPostSuccess, createPostFailure,
    updatePostRequest, updatePostSuccess, updatePostFailure,
    deletePostRequest, deletePostSuccess, deletePostFailure
} from '../slices/postsSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleFetchPosts(action: PayloadAction<{ limit?: number; skip?: number } | undefined>): Generator<any, void, any> {
    try {
        const { limit = 10, skip = 0 } = action.payload || {};
        const response = yield call(fetch, `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const data = yield response.json();

        // Save to cache (only first page to avoid massive storage)
        if (typeof window !== 'undefined' && skip === 0) {
            localStorage.setItem('posts_cache', JSON.stringify({
                data: data.posts,
                total: data.total,
                timestamp: Date.now()
            }));
        }

        yield put(fetchPostsSuccess({ posts: data.posts, total: data.total }));
    } catch (error: any) {
        // Try to load from cache on failure (fallback)
        if (typeof window !== 'undefined') {
            const cached = localStorage.getItem('posts_cache');
            if (cached) {
                const { data, total } = JSON.parse(cached);
                yield put(fetchPostsSuccess({ posts: data, total: total || data.length }));
                return;
            }
        }
        yield put(fetchPostsFailure(error.message));
    }
}

function* handleSearchPosts(action: PayloadAction<string>): Generator<any, void, any> {
    try {
        const query = action.payload;
        const response = yield call(fetch, `https://dummyjson.com/posts/search?q=${query}`);

        if (!response.ok) throw new Error('Search failed');

        const data = yield response.json();
        yield put(fetchPostsSuccess({ posts: data.posts, total: data.total }));
    } catch (error: any) {
        yield put(fetchPostsFailure(error.message));
    }
}

function* handleFetchPostDetail(action: PayloadAction<number>): Generator<any, void, any> {
    try {
        const response = yield call(fetch, `https://dummyjson.com/posts/${action.payload}`);

        if (!response.ok) {
            throw new Error('Failed to fetch post');
        }

        const data = yield response.json();
        yield put(fetchPostDetailSuccess(data));
    } catch (error: any) {
        yield put(fetchPostsFailure(error.message));
    }
}

function* handleCreatePost(action: PayloadAction<{ title: string; body: string; userId: number }>): Generator<any, void, any> {
    try {
        const response = yield call(fetch, 'https://dummyjson.com/posts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(action.payload),
        });
        if (!response.ok) throw new Error('Failed to create post');
        const data = yield response.json();
        // DummyJSON returns id: 151 (fixed) usually, so in real app we'd use real ID.
        // We'll trust the API for now.
        yield put(createPostSuccess(data));
    } catch (error: any) {
        yield put(createPostFailure(error.message));
    }
}

function* handleUpdatePost(action: PayloadAction<{ id: number; title: string; body: string }>): Generator<any, void, any> {
    try {
        const response = yield call(fetch, `https://dummyjson.com/posts/${action.payload.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: action.payload.title,
                body: action.payload.body,
            }),
        });
        if (!response.ok) throw new Error('Failed to update post');
        const data = yield response.json();
        yield put(updatePostSuccess(data));
    } catch (error: any) {
        yield put(updatePostFailure(error.message));
    }
}

function* handleDeletePost(action: PayloadAction<number>): Generator<any, void, any> {
    try {
        const response = yield call(fetch, `https://dummyjson.com/posts/${action.payload}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete post');
        // DummyJSON returns deleted post data
        yield put(deletePostSuccess(action.payload));
    } catch (error: any) {
        yield put(deletePostFailure(error.message));
    }
}

export function* postsSaga() {
    yield takeLatest(fetchPostsRequest.type, handleFetchPosts);
    yield takeLatest(searchPostsRequest.type, handleSearchPosts);
    yield takeLatest(fetchPostDetailRequest.type, handleFetchPostDetail);
    yield takeLatest(createPostRequest.type, handleCreatePost);
    yield takeLatest(updatePostRequest.type, handleUpdatePost);
    yield takeLatest(deletePostRequest.type, handleDeletePost);
}

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(baseUrl + 'posts');
            if (!response.ok) {
                return Promise.reject('Unable to fetch posts: ' + response.status);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await fetch(baseUrl + 'posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });
            if (!response.ok) {
                return Promise.reject('Unable to create post: ' + response.status);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const toggleLike = createAsyncThunk(
    'posts/toggleLike',
    async ({ postId, userId }, { rejectWithValue }) => {
        try {
            const response = await fetch(baseUrl + `posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });
            if (!response.ok) {
                return Promise.reject('Unable to toggle like: ' + response.status);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addComment = createAsyncThunk(
    'posts/addComment',
    async ({ postId, content, userId }, { rejectWithValue }) => {
        try {
            const response = await fetch(baseUrl + `posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content, userId })
            });
            if (!response.ok) {
                return Promise.reject('Unable to add comment: ' + response.status);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteComment = createAsyncThunk(
    'posts/deleteComment',
    async ({ postId, commentId }, { rejectWithValue }) => {
        try {
            const response = await fetch(baseUrl + `posts/${postId}/comments/${commentId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                return Promise.reject('Unable to delete comment: ' + response.status);
            }
            return { postId, commentId };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const editPost = createAsyncThunk(
    'posts/editPost',
    async ({ postId, updatedData }, { rejectWithValue }) => {
        try {
            const response = await fetch(baseUrl + `posts/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            if (!response.ok) {
                return Promise.reject('Unable to edit post: ' + response.status);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (postId, { rejectWithValue }) => {
        try {
            const response = await fetch(baseUrl + `posts/${postId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                return Promise.reject('Unable to delete post: ' + response.status);
            }
            return postId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostsLoading = (state) => state.posts.isLoading;
export const selectPostsError = (state) => state.posts.errMess;

const initialState = {
    posts: [],
    isLoading: false,
    errMess: null,
    currentPost: null
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setCurrentPost: (state, action) => {
            state.currentPost = action.payload;
        },
        clearErrors: (state) => {
            state.errMess = null;
        },
        clearPosts: (state) => {
            state.posts = [];
            state.currentPost = null;
            state.errMess = null;
        },
        incrementViews: (state, action) => {
            const post = state.posts.find(p => p.id === action.payload);
            if (post) {
                post.views = (post.views || 0) + 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true;
                state.errMess = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
                state.errMess = null;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error ? action.error.message : 'Fetch failed';
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.unshift(action.payload);
            })
            .addCase(toggleLike.fulfilled, (state, action) => {
                const { postId, likes, likedBy } = action.payload;
                const post = state.posts.find(p => p.id === postId);
                if (post) {
                    post.likes = likes;
                    post.likedBy = likedBy;
                }
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const { postId, comments } = action.payload;
                const post = state.posts.find(p => p.id === postId);
                if (post) {
                    post.comments = comments;
                }
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                const { postId, commentId } = action.payload;
                const post = state.posts.find(p => p.id === postId);
                if (post) {
                    post.comments = post.comments.filter(c => c.id !== commentId);
                }
            })
            .addCase(editPost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            });
    }
});

export const { setCurrentPost, clearErrors, clearPosts, incrementViews } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
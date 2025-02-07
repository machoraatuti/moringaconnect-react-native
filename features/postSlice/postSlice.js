import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

// Async thunk for fetching posts
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { getState, rejectWithValue }) => {
        try {
            console.log('Starting posts fetch process...');
            const state = getState();
            const token = state.auth?.token;

            // Basic authentication check
            if (!token) {
                console.log('Authentication token not found');
                return rejectWithValue('Authentication required');
            }

            // Making the authenticated request
            const response = await fetch(baseUrl + 'posts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.log('Server response not ok:', response.status);
                throw new Error(`Failed to fetch posts: ${response.status}`);
            }

            const data = await response.json();
            console.log('Successfully fetched posts:', data.length);
            return data;

        } catch (error) {
            console.error('Fetch error:', error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for creating posts
export const createPost = createAsyncThunk(
    'posts/createPost',
    async (formData, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const token = state.auth?.token;
            const userId = state.auth?.user?.id;

            if (!token || !userId) {
                return rejectWithValue('Authentication required');
            }

            const postData = {
                ...Object.fromEntries(formData),
                userId,
                createdAt: new Date().toISOString()
            };

            const response = await fetch(baseUrl + 'posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                throw new Error(`Failed to create post: ${response.status}`);
            }

            const newPost = await response.json();
            return newPost;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for post interactions (likes, comments)
export const toggleLike = createAsyncThunk(
    'posts/toggleLike',
    async ({ postId }, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const token = state.auth?.token;
            const userId = state.auth?.user?.id;

            if (!token || !userId) {
                return rejectWithValue('Authentication required');
            }

            const response = await fetch(baseUrl + `posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });

            if (!response.ok) {
                throw new Error(`Failed to toggle like: ${response.status}`);
            }

            return await response.json();

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Initial state definition
const initialState = {
    posts: [],
    isLoading: false,
    errMess: null,
    currentPost: null
};

// Selector functions
export const selectAllPosts = (state) => {
    console.log('Selecting posts, count:', state.posts.posts.length);
    return state.posts.posts;
};
export const selectPostsLoading = (state) => state.posts.isLoading;
export const selectPostsError = (state) => state.posts.errMess;

// Create the posts slice
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
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
            // Handle fetchPosts lifecycle
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
                state.errMess = action.payload;
            })
            // Handle createPost success
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.unshift(action.payload);
            })
            // Handle toggleLike success
            .addCase(toggleLike.fulfilled, (state, action) => {
                const { id, likes, likedBy } = action.payload;
                const post = state.posts.find(p => p.id === id);
                if (post) {
                    post.likes = likes;
                    post.likedBy = likedBy;
                }
            });
    }
});

export const { clearErrors, clearPosts, incrementViews } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
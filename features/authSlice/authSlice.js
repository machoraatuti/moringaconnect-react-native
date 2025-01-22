import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials) => {
        const response = await fetch(baseUrl + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        if (!response.ok) {
            return Promise.reject('Login failed: ' + response.status);
        }
        return await response.json();
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData) => {
        const response = await fetch(baseUrl + 'users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            return Promise.reject('Registration failed: ' + response.status);
        }
        return await response.json();
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(baseUrl + 'logout', {
                method: 'POST'
            });
            if (!response.ok) {
                return Promise.reject('Logout failed: ' + response.status);
            }
            await AsyncStorage.multiRemove(['token', 'user', 'userRole']);
            return null;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isAdmin: false,
    isLoading: false,
    errMess: null,
    logoutSuccess: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.errMess = null;
        },
        resetLogoutStatus: (state) => {
            state.logoutSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.errMess = null;
            })
            .addCase(loginUser.fulfilled, async (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.isAdmin = action.payload.user.role === 'admin';
                
                await AsyncStorage.multiSet([
                    ['token', action.payload.token],
                    ['user', JSON.stringify(action.payload.user)],
                    ['userRole', action.payload.user.role]
                ]);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error ? action.error.message : 'Login failed';
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.errMess = null;
            })
            .addCase(registerUser.fulfilled, async (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.isAdmin = false;
                
                await AsyncStorage.multiSet([
                    ['token', action.payload.token],
                    ['user', JSON.stringify(action.payload.user)],
                    ['userRole', action.payload.user.role]
                ]);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error ? action.error.message : 'Registration failed';
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.errMess = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.isAdmin = false;
                state.isLoading = false;
                state.errMess = null;
                state.logoutSuccess = true;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.payload;
            });
    }
});

export const { clearError, resetLogoutStatus } = authSlice.actions;
export const authReducer = authSlice.reducer;
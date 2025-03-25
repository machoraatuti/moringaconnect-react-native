// Modified authSlice.js to provide a mock user without authentication
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock user data
const mockUser = {
  id: 'mock-user-001',
  username: 'demouser',
  email: 'demo@example.com',
  fullName: 'Demo User',
  role: 'user', // Change to 'admin' if you want admin access
  // Add any other user properties your app requires
};

// Initial state with the mock user already logged in
const initialState = {
  user: mockUser,
  token: 'mock-token-12345',
  isLoading: false,
  isSuccess: true,
  isError: false,
  message: '',
};

// Keep the original thunks for API compatibility, but they won't be used
export const checkAuthToken = createAsyncThunk(
  'auth/checkToken',
  async (_, thunkAPI) => {
    try {
      // Always return success with the mock user
      return { user: mockUser };
    } catch (error) {
      return thunkAPI.rejectWithValue('Authentication failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      // For development purposes, we'll just return success
      return { success: true };
    } catch (error) {
      return thunkAPI.rejectWithValue('Logout failed');
    }
  }
);

// Auth slice with reducers
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Add any synchronous reducers if needed
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // checkAuthToken cases
      .addCase(checkAuthToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = mockUser; // Always set mock user
      })
      .addCase(checkAuthToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = mockUser; // For development, still set mock user
      })
      
      // logoutUser cases
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        // For development purposes, don't actually log out
        // Uncomment the next line if you want logout to work
        // state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
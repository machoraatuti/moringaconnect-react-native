
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl + 'users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        statusCode: error.response?.status
      });
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  'users/updateStatus',
  async ({ userId, isOnline }, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl + `users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isOnline })
      });
      if (!response.ok) {
        throw new Error('Failed to update user status');
      }
      const data = await response.json();
      return { userId, isOnline, ...data };
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        statusCode: error.response?.status
      });
    }
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl + 'users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        statusCode: error.response?.status
      });
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl + `users/${userId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      return userId;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        statusCode: error.response?.status
      });
    }
  }
);

const initialState = {
  users: [],
  onlineUsers: {},
  isLoading: false,
  errMess: null,
  lastUpdated: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.errMess = null;
    },
    setLocalUserStatus: (state, action) => {
      const { userId, isOnline } = action.payload;
      if (state.onlineUsers[userId] !== isOnline) {
        state.onlineUsers[userId] = isOnline;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.errMess = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.payload?.message || 'Failed to fetch users';
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const { userId, isOnline } = action.payload;
        state.onlineUsers[userId] = isOnline;
        const userIndex = state.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
          state.users[userIndex] = {
            ...state.users[userIndex],
            lastSeen: new Date().toISOString()
          };
        }
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
        delete state.onlineUsers[action.payload];
        state.lastUpdated = new Date().toISOString();
      });
  }
});

export const { clearError, setLocalUserStatus } = userSlice.actions;
export const userReducer = userSlice.reducer;
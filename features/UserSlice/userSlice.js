
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

const initialState = {
  users: [],
  onlineUsers: {},
  isLoading: false,
  error: null,
  lastUpdated: null
};

const authHeaders = (getState) => ({
  Authorization: `Bearer ${getState().auth.token}`
});

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl + 'users', {
        headers: authHeaders(getState)
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch users');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        if (key === 'avatar' && value) {
          formData.append(key, {
            uri: value,
            type: 'image/jpeg',
            name: 'avatar.jpg'
          });
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch(baseUrl + 'users', {
        method: 'POST',
        headers: authHeaders(getState),
        body: formData
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to create user');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, ...userData }, { getState, rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        if (key === 'avatar' && value?.startsWith('file://')) {
          formData.append(key, {
            uri: value,
            type: 'image/jpeg',
            name: 'avatar.jpg'
          });
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch(baseUrl + `users/${id}`, {
        method: 'PUT',
        headers: authHeaders(getState),
        body: formData
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update user');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { getState, rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl + `users/${userId}`, {
        method: 'DELETE',
        headers: authHeaders(getState)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete user');
      }
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  'users/updateStatus',
  async ({ userId, isOnline }, { getState, rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl + `users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          ...authHeaders(getState),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isOnline })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Status update failed');
      return { userId, isOnline, lastSeen: data.lastSeen };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.users = [];
      state.onlineUsers = {};
      state.lastUpdated = null;
    },
    setLocalStatus: (state, { payload }) => {
      state.onlineUsers[payload.userId] = payload.isOnline;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.isLoading = false;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.users.push(payload);
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const index = state.users.findIndex(u => u.id === payload.id);
        if (index !== -1) state.users[index] = payload;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.users = state.users.filter(u => u.id !== payload);
        delete state.onlineUsers[payload];
        state.isLoading = false;
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(updateUserStatus.fulfilled, (state, { payload }) => {
        state.onlineUsers[payload.userId] = payload.isOnline;
        const user = state.users.find(u => u.id === payload.userId);
        if (user) user.lastSeen = payload.lastSeen;
      });
  }
});

export const { resetUsers, setLocalStatus } = userSlice.actions;
export const userReducer = userSlice.reducer;
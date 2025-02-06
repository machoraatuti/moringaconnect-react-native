import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_ENDPOINTS = {
  LOGIN: 'login',
  REGISTER: 'users',
  VERIFY: 'verify-token',
  REFRESH: 'refresh-token'
};

// Predetermined admin emails
const ADMIN_EMAILS = [
  'admin@moringa.com',
  'director@moringa.com'
];

const handleAuthResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    console.error('Auth error:', response.status, data);
    throw new Error(data.message || `Error ${response.status}: ${data.error || 'Authentication failed'}`);
  }

  if (!data.token || !data.user) {
    console.error('Invalid response:', data);
    throw new Error('Invalid response: missing token or user data');
  }

  await AsyncStorage.multiSet([
    ['token', data.token],
    ['user', JSON.stringify(data.user)]
  ]);
  
  return data;
};

const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl + AUTH_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      return await handleAuthResponse(response);
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      // Check if the email is in the predetermined admin list
      const isDefaultAdmin = ADMIN_EMAILS.includes(userData.email.toLowerCase());

      const response = await fetch(baseUrl + AUTH_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          ...userData, 
          role: isDefaultAdmin ? 'admin' : 'user',
          email: userData.email.toLowerCase() // Ensure email is lowercase
        })
      });
      return await handleAuthResponse(response);
    } catch (error) {
      console.error('Registration error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const checkAuthToken = createAsyncThunk(
  'auth/checkToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      
      if (!token || !userData) {
        return rejectWithValue('No stored credentials');
      }

      const response = await fetch(baseUrl + AUTH_ENDPOINTS.VERIFY, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        await AsyncStorage.multiRemove(['token', 'user']);
        const data = await response.json();
        return rejectWithValue(data.message || 'Token validation failed');
      }

      return {
        user: JSON.parse(userData),
        token
      };

    } catch (error) {
      console.error('Token verification error:', error);
      await AsyncStorage.multiRemove(['token', 'user']);
      return rejectWithValue(error.message);
    }
  }
);

const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.multiRemove(['token', 'user']);
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isLoading: true,
  error: null,
  isAuthenticated: false,
  isAdmin: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isAuthenticated = true;
      state.isAdmin = payload.user.role === 'admin';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(checkAuthToken.pending, (state) => {
        state.isLoading = true;
        state.error = null; 
      })
      .addCase(checkAuthToken.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.token = payload.token;
        state.isAuthenticated = true;
        state.isAdmin = payload.user.role === 'admin';
      })
      .addCase(checkAuthToken.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.isAuthenticated = false;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending') && 
          !action.type.includes('checkAuthToken'),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled') && 
          !action.type.includes('checkAuthToken') &&
          !action.type.includes('logout'),
        (state, { payload }) => {
          state.isLoading = false;
          state.user = payload.user;
          state.token = payload.token;
          state.isAuthenticated = true;
          state.isAdmin = payload.user.role === 'admin';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected') &&
          !action.type.includes('checkAuthToken'),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  }
});

// Export thunks
export {
  loginUser,
  registerUser,
  checkAuthToken,
  logoutUser
};

// Export actions
export const { clearError, setCredentials } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
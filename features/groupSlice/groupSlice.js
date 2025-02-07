import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl + 'groups');
      const data = await handleResponse(response);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createGroup = createAsyncThunk(
  'groups/createGroup',
  async (groupData, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl + 'groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...groupData,
          createdAt: new Date().toISOString()
        })
      });
      return await handleResponse(response);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateGroup = createAsyncThunk(
  'groups/updateGroup',
  async ({ groupId, updateData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}groups/${groupId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });
      return await handleResponse(response);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteGroup = createAsyncThunk(
  'groups/deleteGroup',
  async (groupId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}groups/${groupId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return groupId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  errMess: null,
  groupsArray: []
};

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.errMess = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Groups
      .addCase(fetchGroups.pending, (state) => {
        state.isLoading = true;
        state.errMess = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groupsArray = action.payload;
        state.errMess = null;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.payload;
      })
      // Create Group
      .addCase(createGroup.pending, (state) => {
        state.isLoading = true;
        state.errMess = null;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groupsArray.unshift(action.payload);
        state.errMess = null;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.payload;
      })
      // Update Group
      .addCase(updateGroup.pending, (state) => {
        state.isLoading = true;
        state.errMess = null;
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.groupsArray.findIndex(g => g.id === action.payload.id);
        if (index !== -1) {
          state.groupsArray[index] = action.payload;
        }
        state.errMess = null;
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.payload;
      })
      // Delete Group
      .addCase(deleteGroup.pending, (state) => {
        state.isLoading = true;
        state.errMess = null;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groupsArray = state.groupsArray.filter(g => g.id !== action.payload);
        state.errMess = null;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.payload;
      });
  }
});

export const { clearErrors, setLoading } = groupSlice.actions;
export const groupsReducer = groupSlice.reducer;
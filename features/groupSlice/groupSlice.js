import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchGroups = createAsyncThunk(
    'groups/fetchGroups',
    async () => {
        const response = await fetch(baseUrl + 'groups');
        if (!response.ok) {
            return Promise.reject('Unable to fetch groups: ' + response.status);
        }
        return await response.json();
    }
);

export const createGroup = createAsyncThunk(
    'groups/createGroup',
    async (groupData) => {
        const response = await fetch(baseUrl + 'groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(groupData)
        });
        if (!response.ok) {
            return Promise.reject('Unable to create group: ' + response.status);
        }
        return await response.json();
    }
);

export const updateGroup = createAsyncThunk(
    'groups/updateGroup',
    async ({ groupId, updateData }) => {
        const response = await fetch(baseUrl + `groups/${groupId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData)
        });
        if (!response.ok) {
            return Promise.reject('Unable to update group: ' + response.status);
        }
        return await response.json();
    }
);

export const deleteGroup = createAsyncThunk(
    'groups/deleteGroup',
    async (groupId) => {
        const response = await fetch(baseUrl + `groups/${groupId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            return Promise.reject('Unable to delete group: ' + response.status);
        }
        return groupId;
    }
);

export const joinGroup = createAsyncThunk(
    'groups/joinGroup',
    async (groupId) => {
        const response = await fetch(baseUrl + `groups/${groupId}/join`, {
            method: 'POST'
        });
        if (!response.ok) {
            return Promise.reject('Unable to join group: ' + response.status);
        }
        return await response.json();
    }
);

const initialState = {
    groups: [],
    isLoading: true,
    errMess: null
};

const groupSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errMess = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGroups.pending, (state) => {
                state.isLoading = true;
                state.errMess = null;
            })
            .addCase(fetchGroups.fulfilled, (state, action) => {
                state.isLoading = false;
                state.groups = action.payload;
                state.errMess = null;
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error ? action.error.message : 'Fetch failed';
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.groups.unshift(action.payload);
            })
            .addCase(updateGroup.fulfilled, (state, action) => {
                const index = state.groups.findIndex(group => group.id === action.payload.id);
                if (index !== -1) {
                    state.groups[index] = action.payload;
                }
            })
            .addCase(deleteGroup.fulfilled, (state, action) => {
                state.groups = state.groups.filter(group => group.id !== action.payload);
            })
            .addCase(joinGroup.fulfilled, (state, action) => {
                const index = state.groups.findIndex(group => group.id === action.payload.id);
                if (index !== -1) {
                    state.groups[index] = action.payload;
                }
            });
    }
});

export const { clearErrors } = groupSlice.actions;
export const groupsReducer = groupSlice.reducer;
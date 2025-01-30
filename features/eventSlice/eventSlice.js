// eventSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

/**
 * Async Thunk for fetching events from the server
 * This function handles the asynchronous logic of retrieving events
 */
export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async () => {
        // Attempt to fetch events from the base URL
        const response = await fetch(baseUrl + 'events');
        
        // Check if the response was successful
        if (!response.ok) {
            // If not successful, reject the promise with an error message
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        
        // Parse and return the JSON data
        const data = await response.json();
        return data;
    }
);

/**
 * Async Thunk for creating a new event
 * Sends event data to the server and returns the created event
 */
export const createEvent = createAsyncThunk(
    'events/createEvent',
    async (eventData) => {
        const response = await fetch(baseUrl + 'events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });
        
        if (!response.ok) {
            return Promise.reject(
                'Unable to create, status: ' + response.status
            );
        }
        
        const data = await response.json();
        return data;
    }
);

/**
 * Async Thunk for updating event status
 * Allows partial update of an event's status and includes notification
 */
export const updateEventStatus = createAsyncThunk(
    'events/updateStatus',
    async ({ eventId, status, message }) => {
        const response = await fetch(baseUrl + 'events/' + eventId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status, message })
        });
        
        if (!response.ok) {
            return Promise.reject(
                'Unable to update, status: ' + response.status
            );
        }
        
        const data = await response.json();
        return {
            eventId,
            status,
            // Create a notification object for the status change
            notification: {
                id: Date.now(),
                message,
                type: status,
                timestamp: new Date().toISOString()
            },
            updatedEvent: data
        };
    }
);

/**
 * Async Thunk for deleting an event
 * Removes an event from the server and returns its ID
 */
export const deleteEvent = createAsyncThunk(
    'events/deleteEvent',
    async (eventId) => {
        const response = await fetch(baseUrl + 'events/' + eventId, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            return Promise.reject(
                'Unable to delete, status: ' + response.status
            );
        }
        
        return eventId;
    }
);

// Selector functions for easily accessing different parts of the events state
/**
 * Selector to get all events from the state
 */
export const selectAllEvents = (state) => state.events.eventsArray;

/**
 * Selector to check if events are currently loading
 */
export const selectEventsLoading = (state) => state.events.isLoading;

/**
 * Selector to retrieve any error messages related to events
 */
export const selectEventsError = (state) => state.events.errMess;

/**
 * Create the events slice with reducers and extra reducers
 */
const eventSlice = createSlice({
    name: 'events',
    // Initial state with loading flag, error message, events array, and notifications
    initialState: { 
        isLoading: true,     // Indicates if events are currently being fetched
        errMess: null,       // Stores any error messages 
        eventsArray: [],     // Stores the list of events
        notifications: []    // Stores notifications related to events
    },
    // Reducers for synchronous state updates
    reducers: {
        // Clear all notifications
        clearNotifications: (state) => {
            state.notifications = [];
        },
        // Dismiss a specific notification by its ID
        dismissNotification: (state, action) => {
            state.notifications = state.notifications.filter(n => n.id !== action.payload);
        }
    },
    // Extra reducers to handle async thunk actions
    extraReducers: (builder) => {
        builder
            // Handle the pending state of fetching events
            .addCase(fetchEvents.pending, (state) => {
                state.isLoading = true;
            })
            // Handle successful event fetching
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.eventsArray = action.payload;
            })
            // Handle failed event fetching
            .addCase(fetchEvents.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            })
            // Add newly created event to the array
            .addCase(createEvent.fulfilled, (state, action) => {
                state.eventsArray.push(action.payload);
            })
            // Update event status and add notification
            .addCase(updateEventStatus.fulfilled, (state, action) => {
                const { eventId, notification, updatedEvent } = action.payload;
                const index = state.eventsArray.findIndex(e => e.id === eventId);
                
                // Update the specific event if found
                if (index !== -1) {
                    state.eventsArray[index] = updatedEvent;
                }
                
                // Add notification if provided
                if (notification) {
                    state.notifications.unshift(notification);
                }
            })
            // Remove deleted event and add a success notification
            .addCase(deleteEvent.fulfilled, (state, action) => {
                // Filter out the deleted event
                state.eventsArray = state.eventsArray.filter(event => event.id !== action.payload);
                
                // Add a success notification
                state.notifications.unshift({
                    id: Date.now(),
                    message: 'Event successfully deleted',
                    type: 'success',
                    timestamp: new Date().toISOString()
                });
            });
    }
});

// Export actions for clear notifications and dismiss notification
export const { clearNotifications, dismissNotification } = eventSlice.actions;

// Export the reducer to be used in the root reducer
export const eventsReducer = eventSlice.reducer;
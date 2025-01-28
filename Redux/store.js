import { configureStore } from '@reduxjs/toolkit';
import {
 persistStore, persistReducer,
 FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../features/authSlice/authSlice';
import { eventsReducer } from '../features/eventSlice/eventSlice';
import { postsReducer } from '../features/postSlice/postSlice';

const persistConfig = {
 key: 'root',
 storage: AsyncStorage,
 whitelist: ['auth', 'events', 'posts'],
 debug: true,
 version: 1
};

const rootReducer = combineReducers({
 auth: authReducer,
 events: eventsReducer,
 posts: postsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
 reducer: persistedReducer,
 middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware({
     serializableCheck: {
       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
     }
   })
});

const persistor = persistStore(store);

export { store, persistor };
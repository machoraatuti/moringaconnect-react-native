import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../features/UserSlice/userSlice';
import { groupsReducer } from '../features/groupSlice/groupSlice';
import { postsReducer } from '../features/postSlice/postSlice'; 
import { authReducer } from '../features/authSlice/authSlice';
import { eventsReducer } from '../features/eventSlice/eventSlice';


import {
   persistStore,
   persistCombineReducers,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
   key: 'root',
   storage: AsyncStorage,
   debug: true
};

export const store = configureStore({
   reducer: persistCombineReducers(config, {
       users: userReducer,
       groups: groupsReducer,
       posts: postsReducer,
       auth: authReducer,
       events: eventsReducer
   }),
   middleware: (getDefaultMiddleware) =>
       getDefaultMiddleware({
           serializableCheck: {
               ignoredActions: [
                   FLUSH,
                   REHYDRATE,
                   PAUSE,
                   PERSIST,
                   PURGE,
                   REGISTER
               ]
           }
       })
});

export const persistor = persistStore(store);
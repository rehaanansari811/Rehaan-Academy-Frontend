import { configureStore} from '@reduxjs/toolkit';
import { profileReducer, subscriptionReducer, userReducer } from './reducers/userReducer';
import { courseReducer } from './reducers/courseReducer';
import { adminReducer } from './reducers/adminReducer';
import { contactReducer } from './reducers/contactReducer';

const store = configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        course:courseReducer,
        subscription:subscriptionReducer,
        admin:adminReducer,
        contact:contactReducer
    },
});

export default store;

export const server = "https://rehaan-academy-server.onrender.com/api/v1";
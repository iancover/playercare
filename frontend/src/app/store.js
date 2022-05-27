// Redux & Redux Toolkit store config
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

// Config store
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});


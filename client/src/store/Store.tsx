// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Cart';

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

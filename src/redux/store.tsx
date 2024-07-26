import { configureStore } from "@reduxjs/toolkit";
import AuthState  from "./slice/authSlice";
export const store = configureStore({
  reducer: {
    auth: AuthState,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

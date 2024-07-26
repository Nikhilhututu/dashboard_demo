import { createSlice } from "@reduxjs/toolkit";
import { logInApi, signUp } from "../../api/authApi";
export interface AuthState {
  isAuthenticate: boolean;
  user: any;
  status: "idle" | "loading" | "succeed" | "failed";
  error: any;
}
const initialState: AuthState = {
  isAuthenticate: false,
  user: null,
  status: "idle",
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // login: (state, action: PayloadAction<any>) => {
    //   state.isAuthenticate = true;
    //   state.user = action.payload;
    // },
    logout: (state: any) => {
      state.isAuthenticate = false;
      state.user = null;
      state.status = "idle";
    },
    reset: (state: any) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeed";
        state.user = action.payload;
        if (!action.payload) {
          state.status = "failed";
        }
        console.log(state.user);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logInApi.fulfilled, (state, action) => {
        state.isAuthenticate = true;
        state.status = "succeed";
        state.user = action.payload;
        if (!action.payload) {
          state.status = "failed";
        }
        console.log("=== login====", action.payload, "      ", state.status);
      })
      .addCase(logInApi.rejected, (state, action) => {
        state.isAuthenticate = false;
        state.status = "failed";
        state.error = action.error.message;
        console.log("=== login==ee==", state.error);
      });
  },
});
export const { logout, reset } = authSlice.actions;

type AuthReducer = typeof authSlice.reducer;
const reducer: AuthReducer = authSlice.reducer;
export default reducer;

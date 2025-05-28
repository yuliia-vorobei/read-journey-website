import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { login, register } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: null,
    email: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addMatcher(isAnyOf(register.pending, login.pending), (state) => {
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addMatcher(
        isAnyOf(register.rejected, login.rejected),
        (state, action) => {
          state.isLoggedIn = false;
          state.isLoading = true;
          state.error = action.payload;
        }
      );
  },
});

export default authSlice.reducer;

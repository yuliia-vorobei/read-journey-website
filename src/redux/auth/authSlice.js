import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getCurrent, login, logout, refreshUser, register } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: null,
    email: null,
    token: null,
    refreshToken: null,
    isLoggedIn: false,
    isLoading: false,
    isRefreshing: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoading = false;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(getCurrent.pending, (state) => {
        state.isRefreshing = true;
        state.isLoading = true;
      })
      .addCase(getCurrent.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isRefreshing = false;
      })

      .addCase(logout.fulfilled, () => {
        return {
          name: null,
          email: null,
          token: null,
          refreshToken: null,
          isLoggedIn: false,
          isLoading: false,
          isRefreshing: false,
          error: null,
          selectedBook: null,
        };
      })
      .addMatcher(isAnyOf(register.pending, login.pending), (state) => {
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addMatcher(
        isAnyOf(register.rejected, login.rejected, getCurrent.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          state.isRefreshing = false;
          state.isLoggedIn = false;
        }
      );
  },
});

export default authSlice.reducer;

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getCurrent, login, logout, refreshUser, register } from "./operations";
import { recommendation } from "../books/operations";

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
      })
      .addCase(login.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;

      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoading = false;
        state.isRefreshing = false;
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
      .addCase(recommendation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
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
        };
      })
      .addMatcher(
        isAnyOf(register.pending, login.pending),
        (state) => {
          state.isLoggedIn = false;
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(register.rejected, login.rejected, refreshUser.rejected, getCurrent.rejected),
        (state, action) => {
          state.isLoggedIn = false;
          state.isLoading = true;
          state.error = action.payload;
        state.isRefreshing = false;

        }
      );
  },
});

export default authSlice.reducer;

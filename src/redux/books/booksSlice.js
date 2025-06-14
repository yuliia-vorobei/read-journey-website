import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { recommendation } from "./operations";
import { logout } from "../auth/operations";

const initialState = {
  items: {
    results: [],
    totalPages: 0,
    page: 1,
    perPage: 10,
  },
  isLoading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(recommendation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(logout.fulfilled, () => {
        return {
          name: null,
          email: null,
          token: null,
          isLoggedIn: false,
          isLoading: false,
          error: null,
        };
      })
      .addMatcher(isAnyOf(recommendation.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(recommendation.rejected), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default booksSlice.reducer;

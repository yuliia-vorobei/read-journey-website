import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth/operations";
import { recommendation } from "./operations";

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

const recommendedBooksSlice = createSlice({
  name: "recommendedBooks",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(recommendation.pending, (state) => {
        state.isLoading = true;
      })
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
      .addCase(recommendation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default recommendedBooksSlice.reducer;

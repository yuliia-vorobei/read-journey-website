import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth/operations";
import { recommendation } from "./operations";

const initialState = {
  items: {
    results: [],
    totalPages: 0,
    page: 1,
    perPage: 8,
    loadMoreEnabled: true,
  },
  isLoading: false,
  error: null,
};

const recommendedBooksSlice = createSlice({
  name: "recommendedBooks",
  initialState,
  reducers: {
    setLoadMoreEnabled(state, action) {
      state.loadMoreEnabled = action.payload;
    },
    clearItems(state) {
      state.items = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(recommendation.pending, (state) => {
        // if (!state.loadMoreEnabled) {
        //   return;
        // }
        state.isLoading = true;
      })
      .addCase(recommendation.fulfilled, (state, action) => {
        // if (!state.loadMoreEnabled) {
        //   return;
        // }
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
        // state.items.totalPages = action.payload.totalPages;
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
        // if (!state.loadMoreEnabled) {
        //   return;
        // }
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setLoadMoreEnabled, clearItems } = recommendedBooksSlice.actions;
export default recommendedBooksSlice.reducer;

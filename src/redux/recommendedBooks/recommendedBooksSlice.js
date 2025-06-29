import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth/operations";
import { recommendation } from "./operations";

const initialState = {
  results: [],
  loadMoreEnabled: true,
  page: 1,
  totalPages: 0,
  perPage: 8,
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
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(recommendation.pending, (state) => {
        if (!state.loadMoreEnabled) {
          return;
        }
        state.isLoading = true;
      })
      .addCase(recommendation.fulfilled, (state, action) => {
        if (!state.loadMoreEnabled) return;

        state.results = action.payload.results;
        state.isLoading = false;
        state.error = null;
        state.totalPages = action.payload.totalPages;
      })

      .addCase(logout.fulfilled, () => {
        return {
          name: null,
          email: null,
          token: null,
          isLoggedIn: false,
          isLoading: false,
          error: null,
          selectedBook: null,
        };
      })
      .addCase(recommendation.rejected, (state, action) => {
        if (!state.loadMoreEnabled) {
          return;
        }
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setLoadMoreEnabled, clearItems } = recommendedBooksSlice.actions;
export default recommendedBooksSlice.reducer;

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addBook,
  addRecommendedBook,
  deleteBook,
  getOwnBooks,
} from "./operations";
import { logout } from "../auth/operations";

const initialState = {
  results: [],
  selectedBook: null,
  isLoading: false,
  error: null,
};

const ownBooksSlice = createSlice({
  name: "ownBooks",
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // state.results = action.payload;
        state.results.push(action.payload);
      })
      .addCase(getOwnBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.results = action.payload;
      })

      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const id = action.payload;
        state.results = state.results.filter((book) => book._id !== id);
      })
      .addCase(addRecommendedBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRecommendedBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const id = action.payload;
        if (!state.results.includes(id)) {
          state.results = [...state.results, id];
        } else {
          state.results;
        }
      })
      .addCase(addRecommendedBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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
      .addMatcher(
        isAnyOf(addBook.pending, getOwnBooks.pending, deleteBook.pending),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(addBook.rejected, getOwnBooks.rejected, deleteBook.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default ownBooksSlice.reducer;

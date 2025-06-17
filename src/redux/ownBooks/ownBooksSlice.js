import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addBook, getOwnBooks } from "./operations";
import { logout } from "../auth/operations";

const initialState = {
  results: [],
  isLoading: false,
  error: null,
};

const ownBooksSlice = createSlice({
  name: "ownBooks",
  initialState,
  extraReducers: (builder) => {
    builder
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
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.results = action.payload;
      })
      .addCase(getOwnBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // state.results.push(action.payload);
        state.results = action.payload;
      })
      .addMatcher(isAnyOf(addBook.pending, getOwnBooks.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        isAnyOf(addBook.rejected, getOwnBooks.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default ownBooksSlice.reducer;

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getBookInfo, startReading, stopReading } from "./operations";
import { logout } from "../auth/operations";

const initialState = {
  selectedBook: null,
  isLoading: false,
  error: null,
};

const startReadingBook = createSlice({
  name: "startReadingBook",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBookInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.selectedBook = action.payload;
      })
      .addCase(startReading.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedBook = action.payload;
        state.startReadingIcon = true;
      })
      .addCase(stopReading.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedBook = action.payload;
        state.stopReadingIcon = true;
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
        isAnyOf(getBookInfo.pending, startReading.pending, stopReading.pending),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getBookInfo.rejected,
          startReading.rejected,
          stopReading.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default startReadingBook.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getBookInfo } from "./operations";

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
      .addCase(getBookInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.selectedBook = action.payload;
      })
      .addCase(getBookInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default startReadingBook.reducer;

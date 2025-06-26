import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getBookInfo, startReading, stopReading } from "./operations";

const initialState = {
  selectedBook: null,
  startReadingIcon: true,
  isLoading: false,
  error: null,
  // items: {
  //   process: [],
  //   status: "",
  //   totalPages: 0,
  //   timeLeftToRead: {},
  // },
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
        // state.items = action.payload;
        state.selectedBook = action.payload;
        state.startReadingIcon = true;
      })
      .addCase(stopReading.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedBook = action.payload;
        state.startReadingIcon = false;
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

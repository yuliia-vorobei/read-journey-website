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
  currentPage: 1,
  itemsPerPage: 6,
  selectedBook: null,
  isLoading: false,
  error: null,
};

const ownBooksSlice = createSlice({
  name: "ownBooks",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.results.push(action.payload);
      })
      .addCase(getOwnBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // const sameBook = new Set();
        // const uniqueBooks = [];
        // for (const book of action.payload) {
        //   const key = `${book.title}-${book.author}`.toLowerCase();
        //   if (!sameBook.has(key)) {
        //     sameBook.add(key);
        //     uniqueBooks.push(book);
        //   }
        // }
        // state.results = uniqueBooks;
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
        const book = action.payload;
        const existingBook = state.results.some(
          (b) =>
            b.title.toLowerCase() === book.title.toLowerCase() &&
            b.author.toLowerCase() === book.author.toLowerCase()
        );
        if (existingBook) {
          state.error = "Book already exists";
          return;
        } else {
          state.error = null;
          state.results.push(book);
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

export const { setItemsPerPage, setPage } = ownBooksSlice.actions;
export default ownBooksSlice.reducer;

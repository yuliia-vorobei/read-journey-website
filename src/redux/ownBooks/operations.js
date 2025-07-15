import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../../hooks/handleError";

const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
export const addBook = createAsyncThunk(
  "ownBooks/addBook",
  async (book, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const token = reduxState.auth.token;
      setAuthHeader(token);
      const { data } = await axios.post("/books/add", book);
      return data;
    } catch (error) {
      const status = error.response?.status;
      handleError(status);
      return thunkAPI.rejectWithValue(status);
    }
  }
);

export const addRecommendedBook = createAsyncThunk(
  "ownBooks/addRecommendedBook",
  async (bookId, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const token = reduxState.auth.token;
      setAuthHeader(token);
      await axios.post(`/books/add/${bookId}`);
      return bookId;
    } catch (error) {
      const status = error.response?.status;
      handleError(status);
      return thunkAPI.rejectWithValue(status);
    }
  }
);

export const getOwnBooks = createAsyncThunk(
  "ownBooks/getOwnBooks",
  async ({ status }, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const token = reduxState.auth.token;
      setAuthHeader(token);
      const url =
        status && status !== "all"
          ? `/books/own?status=${status}`
          : "/books/own";

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      const status = error.response?.status;
      handleError(status);
      return thunkAPI.rejectWithValue(status);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "ownBooks/deleteBook",
  async (bookId, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const token = reduxState.auth.token;
      setAuthHeader(token);
      await axios.delete(`/books/remove/${bookId}`);
      return bookId;
    } catch (error) {
      const status = error.response?.status;
      handleError(status);
      return thunkAPI.rejectWithValue(status);
    }
  }
);

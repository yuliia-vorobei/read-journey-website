import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../../hooks/handleError";

const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getBookInfo = createAsyncThunk(
  "startReadingBook/getBookInfo",
  async (bookId, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const token = reduxState.auth.token;
      setAuthHeader(token);
      const { data } = await axios.get(`/books/${bookId}`);
      return data;
    } catch (error) {
      return handleError(error.response?.status);
    }
  }
);

export const startReading = createAsyncThunk(
  "startReadingBook/startReading",
  async (page, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const token = reduxState.auth.token;
      setAuthHeader(token);
      const { data } = await axios.post("/books/reading/start", page);
      return data;
    } catch (error) {
      return handleError(error.response?.status);
    }
  }
);

export const stopReading = createAsyncThunk(
  "startReadingBook/stopReading",
  async (page, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const token = reduxState.auth.token;
      setAuthHeader(token);
      const { data } = await axios.post("/books/reading/finish", page);
      return data;
    } catch (error) {
      return handleError(error.response?.status);
    }
  }
);

export const deleteProgress = createAsyncThunk(
  "startReadingBook/deleteProgress",
  async ({ bookId, readingId }, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const token = reduxState.auth.token;
      setAuthHeader(token);
      await axios.delete("/books/reading", {
        params: {
          bookId,
          readingId,
        },
      });
      return bookId;
    } catch (error) {
      return handleError(error.response?.status);
    }
  }
);

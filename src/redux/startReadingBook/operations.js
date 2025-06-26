import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
      return thunkAPI.rejectWithValue(error.message);
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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

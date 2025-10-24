import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../../hooks/handleError";

const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const recommendation = createAsyncThunk(
  "recommendedBooks/recommendation",
  async ({ page, perPage, title, author }, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const token = reduxState.auth.token;

      setAuthHeader(token);
      const url =
        title || author
          ? `/books/recommend?page=${page}&limit=${perPage}&title=${title.trim()}&author=${author.trim()}`
          : `/books/recommend?page=${page}&limit=${perPage}`;

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      const status = error.response?.status;
      handleError(status);
      return thunkAPI.rejectWithValue(status);
    }
  }
);

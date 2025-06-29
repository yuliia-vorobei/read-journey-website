import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const recommendation = createAsyncThunk(
  "recommendedBooks/recommendation",
  async ({ page, perPage }, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const token = reduxState.auth.token;
      setAuthHeader(token);
      const { data } = await axios.get(
        `/books/recommend?page=${page}&limit=${perPage}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const recommendation = createAsyncThunk(
//   "recommendedBooks/recommendation",
//   async (credentials, thunkAPI) => {
//     try {
//       const reduxState = thunkAPI.getState();
//       const token = reduxState.auth.token;
//       setAuthHeader(token);
//       const { data } = await axios.get("/books/recommend", credentials);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

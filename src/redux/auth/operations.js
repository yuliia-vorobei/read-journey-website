import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from "../../hooks/handleError";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";
const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  axios.defaults.headers.common["Authorization"] = ``;
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials) => {
    try {
      const { data } = await axios.post("/users/signup", credentials);
      return data;
    } catch (error) {
      return handleError(error.response?.status);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (credentials) => {
  try {
    if (!credentials) {
      handleError();
    } else {
      const { data } = await axios.post("/users/signin", credentials);
      setAuthHeader(data.token);
      return data;
    }
  } catch (error) {
    return handleError(error.response?.status);
  }
});

export const getCurrent = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const token = reduxState.auth.token;
      setAuthHeader(token);
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      return handleError(error.response?.status);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const refreshToken = reduxState.auth.refreshToken;
      setAuthHeader(refreshToken);
      const response = await axios.get("/users/current/refresh");
      return response.data;
    } catch (error) {
      return handleError(error.response?.status);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const refreshToken = thunkAPI.getState().auth.refreshToken;
      return refreshToken !== null;
    },
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const reduxState = thunkAPI.getState();
    const token = reduxState.auth.token;
    setAuthHeader(token);
    await axios.post("/users/signout");
    clearAuthHeader();
  } catch (error) {
    return handleError(error.response?.status);
  }
});

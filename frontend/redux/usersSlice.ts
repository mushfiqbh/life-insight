import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "@/types/user";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_SERVER_URL;

const initialState: UserState = {
  token: null,
  userInfo: null,
  userInfoList: [],
  error: null,
};

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (_, { getState, rejectWithValue }) => {
    const { user } = getState() as { user: UserState };
    const token = user.token;

    if (!token) return rejectWithValue("No token available");

    try {
      const response = await axios.get(`${url}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || "Fetch error");
      }
      return rejectWithValue("Unknown error");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
      }
    },
    loadTokenFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const savedToken = localStorage.getItem("token");
        state.token = savedToken || null;
      }
    },
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
      state.userInfoList = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload.userInfo;
        state.userInfoList = action.payload.userInfoList;
        state.error = null;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setToken, loadTokenFromStorage, logout } = userSlice.actions;
export default userSlice.reducer;

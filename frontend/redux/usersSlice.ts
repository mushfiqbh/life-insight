import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import User from "@/types/user";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_SERVER_URL;

interface UserState {
  token: string;
  userInfo: User;
  userInfoList: User[];
}

const initialState: UserState = {
  token: "",
  userInfo: {} as User,
  userInfoList: [],
};

// Fetch user info
export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/api/users`, {
        headers: { token },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.userInfoList = action.payload.userInfoList;
    });
  },
});

export const { setToken } = userSlice.actions;
export default userSlice.reducer;

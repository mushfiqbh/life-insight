import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ConditionProps, {
  ConditionIndex,
  ConditionState,
} from "@/types/conditionProps";

const url = process.env.NEXT_PUBLIC_SERVER_URL;

const initialState: ConditionState = {
  condition: {} as ConditionProps,
  conditions: {
    conditionList: [],
    totalPages: 1,
  },
  index: [],
  loading: true,
  error: null,
};

// fetch admin posts
export const fetchConditions = createAsyncThunk(
  "condition/fetchConditions",
  async (page: number) => {
    try {
      const response = await fetch(`${url}/api/conditions/page/${page}`);
      const {
        data,
        totalPages,
      }: { data: ConditionProps[]; totalPages: number } = await response.json();

      return { conditionList: data, totalPages };
    } catch (error) {
      console.error("Failed to fetch conditions", error);
    }
  }
);

// Fetch condition index
export const fetchConditionIndex = createAsyncThunk(
  "condition/fetchConditionIndex",
  async () => {
    const response = await axios.get(url + "/api/conditions/index");
    return response.data.data.sort((a: ConditionIndex, b: ConditionIndex) =>
      a.title > b.title ? 1 : -1
    );
  }
);

// Fetch condition with error handling
export const fetchCondition = createAsyncThunk(
  "condition/fetchCondition",
  async (label: string) => {
    const response = await axios.get(url + "/api/conditions/" + label);
    return response.data.data;
  }
);

// Delete condition item
export const deleteCondition = createAsyncThunk(
  "condition/delete",
  async (ID: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/api/conditions/${ID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        return ID;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
    }
  }
);

const conditionsSlice = createSlice({
  name: "condition",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConditions.fulfilled, (state, action) => {
      state.conditions = action.payload ?? { conditionList: [], totalPages: 0 };
    });
    builder.addCase(fetchCondition.fulfilled, (state, action) => {
      state.condition = action.payload;
    });
    builder.addCase(fetchCondition.rejected, (state) => {
      state.error = "Error";
    });
    builder.addCase(fetchConditionIndex.fulfilled, (state, action) => {
      state.index = action.payload;
    });
  },
});

export default conditionsSlice.reducer;

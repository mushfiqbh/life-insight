import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CatalogProps, {
  OverviewIndex,
  CatalogState,
} from "@/types/catalogProps";

const url = process.env.NEXT_PUBLIC_SERVER_URL;

const initialState: CatalogState = {
  overview: {} as CatalogProps,
  overviews: {
    overviewList: [],
    totalPages: 1,
  },
  index: [],
  loading: true,
  error: null,
};

// fetch admin posts
export const fetchOverviews = createAsyncThunk(
  "catalog/fetchOverviews",
  async (page: number) => {
    try {
      const response = await fetch(`${url}/api/catalogs/page/${page}`);
      const { data, totalPages }: { data: CatalogProps[]; totalPages: number } =
        await response.json();

      return { overviewList: data, totalPages };
    } catch (error) {
      console.error("Failed to fetch catalogs", error);
    }
  }
);

// Fetch overview index
export const fetchOverviewIndex = createAsyncThunk(
  "catalog/fetchOverviewIndex",
  async () => {
    const response = await axios.get(url + "/api/catalogs/");
    return response.data.data.sort((a: OverviewIndex, b: OverviewIndex) =>
      a.title > b.title ? 1 : -1
    );
  }
);

// Fetch overview with error handling
export const fetchOverview = createAsyncThunk(
  "catalog/fetchOverview",
  async (label: string) => {
    const response = await axios.get(url + "/api/catalogs/" + label);
    return response.data.data;
  }
);

// Delete catalog item
export const deleteCatalog = createAsyncThunk(
  "catalog/delete",
  async (ID: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/api/catalogs/${ID}`);
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

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOverviews.fulfilled, (state, action) => {
      state.overviews = action.payload ?? { overviewList: [], totalPages: 0 };
    });
    builder.addCase(fetchOverview.fulfilled, (state, action) => {
      state.overview = action.payload;
    });
    builder.addCase(fetchOverview.rejected, (state) => {
      state.error = "Error";
    });
    builder.addCase(fetchOverviewIndex.fulfilled, (state, action) => {
      state.index = action.payload;
    });
  },
});

export default catalogSlice.reducer;

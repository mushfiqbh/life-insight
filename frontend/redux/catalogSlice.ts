import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CatalogProps from "@/types/catalogProps";

const url = process.env.NEXT_PUBLIC_SERVER_URL;

interface CatalogState {
  catalog: CatalogProps[];
  loading: boolean;
}

const initialState: CatalogState = {
  catalog: [],
  loading: true,
};

// Fetch catalog
export const fetchCatalog = createAsyncThunk("catalog/fetch", async () => {
  const response = await axios.get(url + "/api/catalogs");
  return response.data.data.sort((a: CatalogProps, b: CatalogProps) =>
    a.title > b.title ? 1 : -1
  );
});

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
    builder.addCase(fetchCatalog.fulfilled, (state, action) => {
      state.catalog = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteCatalog.fulfilled, (state, action) => {
      state.catalog = state.catalog.filter(
        (item) => item._id !== action.payload
      );
    });
  },
});

export default catalogSlice.reducer;

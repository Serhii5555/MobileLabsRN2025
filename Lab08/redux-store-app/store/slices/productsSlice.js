import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: "1",
      title: "Wireless Mouse",
      price: 3249.99,
      description: "Ergonomic wireless mouse with USB receiver.",
      category: "Electronics",
      imageUrl:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR8hU8OZ7Mds8r40ng_DjbS5qYZOeDkCtoEx2GEjAWQ8tSFQd8-NSpQ969Ny12h4n9IwMKuh0M0bYov_BGSF57p4h2rOtonfiGQe3DQRv1uZ7MwXqsSZZGv",
    },
    {
      id: "2",
      title: "Water Bottle",
      price: 959.99,
      description: "Insulated stainless steel water bottle (750ml).",
      category: "Fitness",
      imageUrl:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTcHPIiCnToZ2b4eVjW74gaHsgNZkknAqb1cQXmZm6wMhLXNmpc94WLIGvVYatZ4cxEP_BvUGSUSy_7_G-9Ivf5iIzkDPd7jk6Nwg55s3XiYSlVwzp6Kc4tWg",
    },
    {
      id: "3",
      title: "Notebook",
      price: 104.99,
      description: "200-page lined notebook for school or office use.",
      category: "Stationery",
      imageUrl:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR-IiesaSCOIg-EcB2QU_2IVDm8l5KT0sZNu4_rG9odC3tP29D0wexlpvGWoe6Bmnt-lvh7zLbqQFnbsA3cx9OMh8-3fT0MWDr8vIIBSEQC4yxk_6UcFy09fQ",
    },
  ];
});

export const deleteProductAsync = createAsyncThunk(
  "products/delete",
  async (id) => {
    await api.delete(`/products/${id}.json`);
    return id;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    loading: false,
    deleting: false,
    adding: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;

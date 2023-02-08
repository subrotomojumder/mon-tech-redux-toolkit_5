import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchProducts } from "./productsAPI"

const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    error: ""
}

export const getProducts = createAsyncThunk("products/getProduct", async ()=> {
    const products = fetchProducts();
    return products;
})

const productSlice = createSlice({
    name: "products",
    initialState,
    extraReducers:(builder) => {
        builder.addCase(getProducts.pending, (state, action)=> {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getProducts.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.products = action.payload;
            state.isError = false;
        });
        builder.addCase(getProducts.rejected, (state, action)=> {
            state.isLoading = false;
            state.products= [];
            state.isError = true;
            state.error = action.error.message;
        });
    },
})

export default productSlice.reducer;
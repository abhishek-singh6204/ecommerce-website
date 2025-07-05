import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { default as axios } from 'axios';

export const fetchFilteredProducts = createAsyncThunk("/shop/product/allProducts", async ({filterparams,sortparams}) => {
    const query=new URLSearchParams({
        ...filterparams,
        sortBy:sortparams
    })
     const response=await axios.get(`${import.meta.env.VITE_API_URL}/shop/product/allProducts?${query}`);
    // console.log("in slice",response);
    return response.data;
    // return response;
})
export const getProductDetailes=createAsyncThunk("/shop/product/detailedProduct",async(id)=>{
    const response=await axios.get(`${import.meta.env.VITE_API_URL}/shop/product/getDetailed/${id}`);
    return response.data;
})
const initialState = {
    isloading: false,
    shopProductList: null,
    productDetails:null
}
const shopProductSlice = createSlice({
    name: "shopProduct",
    initialState,
    reducers: {
        setProductDetails:(state)=>{
            state.productDetails=null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFilteredProducts.pending, (state) => {
            state.isloading = true
        }).addCase(fetchFilteredProducts.fulfilled,(state,action)=>{
            state.isloading=false,
            state.shopProductList=action?.payload?.data;
        }).addCase(fetchFilteredProducts.rejected,(state)=>{
            state.isloading=false,
            state.shopProductList=null;
        }).addCase(getProductDetailes.pending, (state) => {
            state.isloading = true
        }).addCase(getProductDetailes.fulfilled,(state,action)=>{
            state.isloading=false,
            state.productDetails=action?.payload?.data;
        }).addCase(getProductDetailes.rejected,(state)=>{
            state.isloading=false,
            state.productDetails=null;
        })
    }
})
export const {setProductDetails} =shopProductSlice.actions
export default shopProductSlice.reducer;
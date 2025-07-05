import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { default as axios } from 'axios';
// import { Slice } from "lucide-react";
import { react } from 'react';
const initialState={
    isLoading:false,
    searchProduct:[]
}
export const searchProducts=createAsyncThunk('/search/keyword',async (keyword)=>{
    console.log(keyword,'Slice');
    const response=await axios.get(`${import.meta.env.VITE_API_URL}/search/products/${keyword}`) ;
    return response.data;
})

const searchSlice=createSlice({
    name:"searchProducts",
    initialState,
    reducers:{
        resetSearchProducts:(state)=>{
            state.searchProduct=[]
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(searchProducts.pending,(state)=>{
            state.isLoading=true
        }).addCase(searchProducts.fulfilled,(state,action)=>{
            state.isLoading=true
            state.searchProduct=action?.payload?.data
        }).addCase(searchProducts.rejected,(state)=>{
            state.isLoading=false
            state.searchProduct=[]
        })
    }
})
// module.exports=resetSearchProducts.action
export const {resetSearchProducts}=searchSlice.actions;
export default searchSlice.reducer ;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { default as axios } from 'axios';
// import { Slice } from "lucide-react";
import { react } from 'react';
const initialState={
    isLoading:false,
    reviewList:[],
   
}
export const addReview=createAsyncThunk('/review/add',async (data)=>{
    console.log(data,'Slice');
    const response=await axios.post(`${import.meta.env.VITE_API_URL}/review/add`,data) ;
    return response.data;
})
export const getReview=createAsyncThunk('/review/get',async (productId)=>{
    console.log(productId,'Slice');
    const response=await axios.get(`${import.meta.env.VITE_API_URL}/review/${productId}`) ;
    console.log(response.data.data);
    return response?.data?.data;
})
const reviewSlice=createSlice({
    name:"reviewSlice",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder.addCase(getReview.pending,(state)=>{
            console.log('loading')
            state.isLoading=true
        }).addCase(getReview.fulfilled,(state,action)=>{
            state.isLoading=false,
            // console.log('lllllll');
            state.reviewList=action?.payload
        }).addCase(getReview.rejected,(state)=>{
            state.isLoading=false,
            state.reviewList=[]
        })
      
    }
})
// export const {resetSearchProducts}=searchSlice.actions;
export default reviewSlice.reducer ;
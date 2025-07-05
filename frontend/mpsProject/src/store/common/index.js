import { default as axios } from 'axios';

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    featureItems: []
}
export const addFeature = createAsyncThunk("/addFeature", async (data) => {
    console.log(data);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/addFeature`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
})
export const getFeature = createAsyncThunk("/feature/get", async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/feature/get`);
    return response.data;
})
const featureSlice = createSlice({
    name: 'featureSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFeature.pending,(state)=>{
            state.isLoading=true
        }).addCase(getFeature.fulfilled,(state,action)=>{
            state.isLoading=false
            state.featureItems=action?.payload?.data
        }).addCase(getFeature.rejected,(state)=>{
            state.isLoading=false
            state.featureItems=[]
        })
    }
})

export default featureSlice.reducer;
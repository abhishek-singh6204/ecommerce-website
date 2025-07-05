import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { default as axios } from 'axios';
const initialState={
    isLoading:false,
    addressList:[]
}

export const addNewAddress=createAsyncThunk('/address/add',async(formData)=>{
    console.log("in slice");
    const response=await axios.post( `${import.meta.env.VITE_API_URL}/address/add`,formData);
    return response.data;
})
export const fetchAllAddress=createAsyncThunk('/address/get',async(userId)=>{
    const response=await axios.get(`${import.meta.env.VITE_API_URL}/address/get/${userId}`);
    return response.data;
})
export const editAddress=createAsyncThunk('/address/edit',async({userId,addressId,formData})=>{
    console.log(userId,addressId,formData)
    const response=await axios.put(`${import.meta.env.VITE_API_URL}/address/edit/${userId}/${addressId}`,formData);
    return response.data;
})
export const deleteAddress=createAsyncThunk('/address/delete',async({userId,addressId})=>{
    console.log(userId,addressId);
    const response=await axios.delete(`${import.meta.env.VITE_API_URL}/address/delete/${userId}/${addressId}`);
    return response.data;
})
const addressSlice=createSlice({
    name:"addressSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addNewAddress.pending,(state)=>{
            state.isLoading=true
        }).addCase(addNewAddress.fulfilled,(state,action)=>{
            state.isLoading=true,
            state.addressList=action?.payload?.data
        }).addCase(addNewAddress.rejected,(state)=>{
            state.isLoading=false,
            state.addressList=[]
        }).addCase(fetchAllAddress.pending,(state)=>{
            state.isLoading=true
        }).addCase(fetchAllAddress.fulfilled,(state,action)=>{
            state.isLoading=true,
            state.addressList=action?.payload?.data
        }).addCase(fetchAllAddress.rejected,(state)=>{
            state.isLoading=false,
            state.addressList=[]
        })
    }
})

export default addressSlice.reducer

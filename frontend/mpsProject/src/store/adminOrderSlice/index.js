import { default as axios } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState={
    isLoading:false,
    adminOrderList:[],
    adminOrderDetails:null
}

export const getAllOrdersAdmin=createAsyncThunk('/order/adminOrderList',async ()=>{
    // console.log(orderData);
    const response=await axios.get(`${import.meta.env.VITE_API_URL}/adminOrder/list/`) ;
    return response.data;
})
export const getAdminOrderDetails=createAsyncThunk('/order/adminOrderDetails',async (id)=>{
    // console.log(orderData);
    const response=await axios.get(`${import.meta.env.VITE_API_URL}/adminOrder/details/${id}`) ;
    return response.data;
})
export const updateOrderStatus=createAsyncThunk('/order/update',async ({id,orderStatus})=>{
    console.log(orderStatus);
    const response=await axios.put(`${import.meta.env.VITE_API_URL}/adminOrder/update/${id}`,{orderStatus}) ;
    return response.data;
})
const shoppingOrderSlice=createSlice({
    name:'shoppingOrderSlice',
    initialState,
    reducers:{
        setOrderDetails:(state)=>{
            state.adminOrderDetails=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllOrdersAdmin.pending,(state)=>{
            state.isLoading=true
        }).addCase(getAllOrdersAdmin.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.adminOrderList=action?.payload?.data
        }).addCase(getAllOrdersAdmin.rejected,(state,action)=>{
            state.isLoading=false,
            state.adminOrderList=[]
        }).addCase(getAdminOrderDetails.pending,(state)=>{
            state.isLoading=true
        }).addCase(getAdminOrderDetails.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.adminOrderDetails=action?.payload?.data
        }).addCase(getAdminOrderDetails.rejected,(state,action)=>{
            state.isLoading=false,
            state.adminOrderDetails=null
        })
    }
})
export const {setOrderDetails} =shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
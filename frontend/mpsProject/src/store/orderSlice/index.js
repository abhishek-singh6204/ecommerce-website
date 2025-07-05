import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { default as axios } from 'axios';
import { react } from 'react';
const initialState={
    isLoading:false,
    approvalURL:null,
    orderId:null,
    orderList:[],
    orderDetails:null
}
export const createNewOrder=createAsyncThunk('/order/createNewOrder',async (orderData)=>{
    // console.log(orderData);
    const response=await axios.post(`${import.meta.env.VITE_API_URL}/order/create`,orderData) ;
    return response.data;
})
export const captureOrder=createAsyncThunk('/order/capture',async (orderId)=>{
    // console.log(orderData);
    const response=await axios.post(`${import.meta.env.VITE_API_URL}/order/capture`,{orderId}) ;
    return response.data;
})
export const getAllOrdersByUserId=createAsyncThunk('/order/list',async (userId)=>{
    // console.log(orderData);
    const response=await axios.get(`${import.meta.env.VITE_API_URL}/order/list/${userId}`) ;
    return response.data;
})
export const getOrderDetailsById=createAsyncThunk('/order/details',async (id)=>{
    // console.log(orderData);
    const response=await axios.get(`${import.meta.env.VITE_API_URL}/order/details/${id}`) ;
    return response.data;
})
const shoppingOrderSlice=createSlice({
    name:'shoppingOrderSlice',
    initialState,
    reducers:{
        setOrderDetails:(state)=>{
            state.orderDetails=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(createNewOrder.pending,(state)=>{
            state.isLoading=true
        }).addCase(createNewOrder.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.approvalURL=action.payload.approvalURl,
            state.orderId=action.payload.orderId,
            sessionStorage.setItem("currentOrderId",JSON.stringify(action.payload.orderId))
        }).addCase(createNewOrder.rejected,(state,action)=>{
            state.isLoading=false,
            state.approvalURL=null,
            state.orderId=null
        }).addCase(getAllOrdersByUserId.pending,(state)=>{
            state.isLoading=true
        }).addCase(getAllOrdersByUserId.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.orderList=action?.payload?.data
        }).addCase(getAllOrdersByUserId.rejected,(state,action)=>{
            state.isLoading=false,
            state.orderList=[]
        }).addCase(getOrderDetailsById.pending,(state)=>{
            state.isLoading=true
        }).addCase(getOrderDetailsById.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.orderDetails=action?.payload?.data
        }).addCase(getOrderDetailsById.rejected,(state,action)=>{
            state.isLoading=false,
            state.orderDetails=null
        })
    }
})
export const {setOrderDetails} =shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
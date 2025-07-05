import { default as axios } from 'axios';

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    isLoading:false,
    cartItems:[]
}

export const addToCart=createAsyncThunk("/cart/add",async({userId,productId,quantity})=>{
    const response=await axios.post("/cart/add",{
        userId,productId,quantity
    });
    return response.data;
});
export const getCartItems=createAsyncThunk("/cart/get",async(userId)=>{
    const response=await axios.get(`/cart/get/${userId}`);
    // console.log(response.data.data.items);
    return response.data;
});
export const deleteCartItem=createAsyncThunk("/cart/delete",async({userId,productId})=>{
    // console.log("in cartSlice",productId);
    const response=await axios.delete(`/cart/delete/${userId}/${productId}`,{
    });
    // console.log(response.data,"in cartslice");
    return response.data;
});
export const editCartItem=createAsyncThunk("/cart/edit",async({userId,productId,quantity})=>{
    console.log(userId,productId,quantity);
    const response=await axios.put("/cart/edit",{
        userId,productId,quantity
    });
    // console.log(response?.data,"response")
    return response.data;
});
const cartSlice=createSlice({
    name:"cartSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addToCart.pending,(state)=>{
            state.isLoading=true
        }).addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.cartItems=action?.payload?.data
        }).addCase(addToCart.rejected,(state)=>{
            state.isLoading=false,
            state.cartItems=[]
        }).addCase(getCartItems.pending,(state)=>{
            state.isLoading=true
        }).addCase(getCartItems.fulfilled,(state,action)=>{
            state.isLoading=false,
            console.log("hello"),
            state.cartItems=action?.payload?.data?.items
        }).addCase(getCartItems.rejected,(state)=>{
            state.isLoading=false,
            state.cartItems=[]
        }).addCase(deleteCartItem.pending,(state)=>{
            state.isLoading=true
        }).addCase(deleteCartItem.fulfilled,(state,action)=>{
            state.isLoading=false,
            console.log(action?.payload?.data?.carts?.items,"inSLice"),
            
            state.cartItems=action?.payload?.data?.carts?.items
            // console.log(state.cartItems,"in cartitems");
        }).addCase(deleteCartItem.rejected,(state)=>{
            state.isLoading=false,
            state.cartItems=[]
        }).addCase(editCartItem.pending,(state)=>{
            state.isLoading=true
        }).addCase(editCartItem.fulfilled,(state,action)=>{
            state.isLoading=false,
            // console.log(action?.payload?.data?.carts?.items,"inSLice"),
            state.cartItems=action?.payload?.data?.carts?.items
        }).addCase(editCartItem.rejected,(state)=>{
            state.isLoading=false,
            state.cartItems=[]
        })
    }
})
export default cartSlice.reducer;
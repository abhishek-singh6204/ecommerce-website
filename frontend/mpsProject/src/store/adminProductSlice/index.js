import { default as axios } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const fetchAllProducts=createAsyncThunk("/product/allProducts",async()=>{
    // console.log(formData,"data");
    const response=await axios.get(`${import.meta.env.VITE_API_URL}/product/allProducts`);
    console.log("in slice",response.data);
    return response.data;
})
export const editProduct=createAsyncThunk("/product/edit",async({id,formData})=>{
    // console.log(formData,id);
    const response=await axios.put(`${import.meta.env.VITE_API_URL}/edit/${id}`,formData
    );
    // console.log("before return")
    return response.data;
})
export const deleteProduct=createAsyncThunk("/product/delete",async ({id})=>{
    // console.log(id);
    const response=await axios.delete(`${import.meta.env.VITE_API_URL}/product/delete/${id}`,{
        headers:{
            "Content-Type":"application/json"
        }
    });
    return response.data;
})
const initialState={
    isloading:false,
    productList:[]
}
const productSlice=createSlice({
    name:"productSlice",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllProducts.pending,(state)=>{
            state.isloading=true
        }).addCase(fetchAllProducts.fulfilled,(state,action)=>{
            // console.log(action.payload);
            state.isloading=true,
            state.productList=action?.payload?.data;
        }).addCase(fetchAllProducts.rejected,(state)=>{
            state.isloading=false,
            state.productList=[]
        })
    }
})

export default productSlice.reducer;
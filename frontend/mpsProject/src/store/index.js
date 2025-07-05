import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice/index'
import productSlice from './adminProductSlice/index'
import shopProductSlice from './shopProductSlice/index'
import cartSlice from './cartSlice/index'
import addressSlice from './addressSlice/index'
import orderSlice from './orderSlice/index'
import adminOrderSlice from './adminOrderSlice'
import searchSlice from './searchSlice'
import reviewSlice from './reviewSlice'
import featureSlice from './common/index'
const store=configureStore({
    reducer:{
        auth:authReducer,
        adminProducts:productSlice,
        shopProducts:shopProductSlice,
        cartProducts:cartSlice,
        address:addressSlice,
        order:orderSlice,
        adminOrder:adminOrderSlice,
        search:searchSlice,
        review:reviewSlice,
        feature:featureSlice
    }
})
export default store;
import { default as axios } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const initialState = {
    isAuthenticated: false,
    user: null,
    isLoading: false
}
export const Registeruser = createAsyncThunk("/auth/signup", async (formdata) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formdata, { withCredentials: true });
    return response.data;
})
export const Loginuser = createAsyncThunk("/auth/login", async (formdata) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formdata, { withCredentials: true });
    return response.data;
})
export const Logout = createAsyncThunk("/auth/logout", async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, { withCredentials: true });
    return response.data;
})
export const checkAuthorize = createAsyncThunk("/auth/checkauth", async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/check-auth`, {
        withCredentials: true, headers: {
            "Cache-Control": "no-store,no-cache.must-revalidate,proxy-revalidate"
        }
    });
    return response.data;
})
const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setUser: (state, actions) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(Registeruser.pending, (state) => {
            state.isLoading = true

        }).addCase(Registeruser.fulfilled, (state, action) => {
            state.isLoading = false,
                state.isAuthenticated = false,
                state.user = null
        }).addCase(Registeruser.rejected, (state) => {
            state.isLoading = false,
                state.isAuthenticated = false,
                state.user = null
        }).addCase(Loginuser.pending, (state) => {
            state.isLoading = true

        }).addCase(Loginuser.fulfilled, (state, action) => {
            state.isLoading = false,
                state.isAuthenticated = action.payload.success ? true : false,
                state.user = action.payload.success ? action.payload.user : null
        }).addCase(Loginuser.rejected, (state) => {
            state.isLoading = false,
                state.isAuthenticated = false,
                state.user = null
        })
        .addCase(checkAuthorize.pending, (state) => {
            state.isLoading = true

        }).addCase(checkAuthorize.fulfilled, (state, action) => {
            state.isLoading = false,
           state.isAuthenticated = action.payload.success ? true : false,
            state.user = action.payload.success ? action.payload.user : null
        }).addCase(checkAuthorize.rejected, (state) => {
            state.isLoading = false,
            state.isAuthenticated = false,
            state.user = null
        })
        .addCase(Logout.fulfilled, (state, action) => {
            state.isLoading = false,
           state.isAuthenticated = false,
            state.user = null
        })
    }


})
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
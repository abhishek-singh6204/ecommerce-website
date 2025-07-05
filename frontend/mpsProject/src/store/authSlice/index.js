import { default as axios } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const initialState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    token:null
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
// export const checkAuthorize = createAsyncThunk("/auth/checkauth", async () => {
//     const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/check-auth`, {
//         withCredentials: true, headers: {
//             "Cache-Control": "no-store,no-cache.must-revalidate,proxy-revalidate"
//         }
//     });
//     return response.data;
// })

export const checkAuthorize = createAsyncThunk("/auth/checkauth", async (token) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/check-auth`, {
         headers: {
            Authorization:`Bearer ${token}`,
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
        },
        resetTokenAndCredentials:(state)=>{
            state.isAuthenticated=false,
            state.user=null,
            state.token=null
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
                state.user = action.payload.success ? action.payload.user : null,
                state.token=action?.payload?.token,
                sessionStorage.setItem('token',JSON.stringify(action?.payload?.token))
        }).addCase(Loginuser.rejected, (state) => {
            state.isLoading = false,
                state.isAuthenticated = false,
                state.user = null,
                state.token=null

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
export const { setUser, resetTokenAndCredentials} = authSlice.actions;
export default authSlice.reducer;
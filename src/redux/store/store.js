import {configureStore} from "@reduxjs/toolkit"
import cartSlice from "../../slice/cartSlice.js"
import  authReducer from "../../slice/authSlice.js"
export const store=configureStore({
    reducer:{
        cart:cartSlice,
        auth: authReducer,
    }
})
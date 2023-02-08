import {configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import filterReducer from "./features/filter/filterSlice";
import productReducer from "./features/products/productSlice";
import userReducer from "./features/users/userSlice";
import logger from "redux-logger";
const store = configureStore({
    // devTools: false,
    reducer: {
        cart: cartReducer,
        filter: filterReducer,
        products: productReducer,
        users: userReducer,
    },
    // concat er bitor logger  add kore jabe
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(logger)
})

export default store;
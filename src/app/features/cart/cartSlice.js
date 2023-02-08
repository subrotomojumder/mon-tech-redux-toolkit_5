import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const selectedProduct = state.cart.find(product => product.idMeal === action.payload.idMeal);
            if (!selectedProduct) {
                const product = { ...action.payload, quantity: 1 };
                state.cart.push(product)
            }
            else {
                selectedProduct.quantity += 1;
                state.cart.filter(product => product.idMeal !== selectedProduct.idMeal).push(selectedProduct);
            }
        },
        removeFromCart: (state, action) => {
            if(action.payload.quantity > 1){
                const product = {
                    ...action.payload,
                    quantity: action.payload.quantity - 1
                };
                state.cart = state.cart.filter(product => product.idMeal !== action.payload.idMeal);
                state.cart.push(product);
            }
            else{
                state.cart = state.cart.filter(product => product.idMeal !== action.payload.idMeal);
            }
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
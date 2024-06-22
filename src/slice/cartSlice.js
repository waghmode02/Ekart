import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    totalItem: 0,
    searchtext:'',
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      state.items.push({ ...newItem, quantity: 1 }); 
      state.totalPrice += newItem.price;
      state.totalItem += 1;
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity += 1; 
        state.totalPrice += item.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalPrice -= item.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalItem = 0;
    }
    ,
    addSearch:(state,action)=>{
      state.searchtext=action.payload;
    }
    ,
    deleteItem: (state, action) => {
        const id = action.payload;
        const index = state.items.findIndex(item => item.id === id);
        if (index !== -1) {
          const deletedItem = state.items[index];
          state.totalPrice -= deletedItem.price * deletedItem.quantity;
          state.totalItem -=1;
          state.items.splice(index, 1);
        }
    }
  }
});

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalPrice = (state) => state.cart.totalPrice;
export const searchItems=(state)=>state.cart.searchtext;
export const totalItems = (state) => state.cart.totalItem;
export const { addSearch,deleteItem ,addToCart, clearCart, increaseQuantity, decreaseQuantity} = cartSlice.actions;

export default cartSlice.reducer;

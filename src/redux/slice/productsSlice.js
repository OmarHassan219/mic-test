import { createSlice } from '@reduxjs/toolkit'

const initialState = {
products:[]
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {

  GET_PRODUCTS: (state, action) => {
  state.products = action.payload
  
  }
  }
});

export const {GET_PRODUCTS} = productsSlice.actions

export const selectProducts = (state) => state.products.products;

export default productsSlice.reducer
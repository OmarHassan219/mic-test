import { createSlice } from '@reduxjs/toolkit'

const initialState = {
filteredProducts:''

}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {

    FILTER_PRODUCTS: (state, action) => {
const { products , type } = action.payload

if(type){

    const filtered = products.filter((item) => {
    
        return item.type === type
    
    })
    state.filteredProducts = filtered
}else{
    const filtered = products
    state.filteredProducts = filtered
}

    }
  }
});

export const {FILTER_PRODUCTS} = filterSlice.actions
export const SelectFilteredProducts = state => state.filter.filteredProducts

export default filterSlice.reducer
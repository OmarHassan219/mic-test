import { createSlice } from '@reduxjs/toolkit'

const initialState = {
addresses: [],
}

const adressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    SET_ADRESS(state , action){
        console.log(action.payload);
        state.addresses = action.payload
    }
  }
});

export const {SET_ADRESS} = adressSlice.actions
export const selectAddresses = (state) => state.address.addresses;

export default adressSlice.reducer
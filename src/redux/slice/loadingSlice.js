import { createSlice } from '@reduxjs/toolkit'

const initialState = {
isLoading: true
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {

CLOSE_LOADING: (state) => {

state.isLoading = false


},

OPEN_LOADING: (state) => {

state.isLoading = true


}





  }
});

export const {CLOSE_LOADING , OPEN_LOADING} = loadingSlice.actions
export const SelectIsLoading = state => state.loading.isLoading

export default loadingSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
plan: null , 
price: localStorage.getItem('price') ? parseFloat((localStorage.getItem('price'))) : null , 
planss: localStorage.getItem('planss') ? JSON.parse(localStorage.getItem('planss')) : null ,
nano : null , 
kilo : null , 
giga : null , 

}

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
SET_CHOOSEN_PLAN(state , action){
const {plan , price  } = action.payload
state.plan = action.payload
state.price = price 
localStorage.setItem('price' , state.price)
state.planss = plan
localStorage.setItem('planss' , JSON.stringify(state.planss))




},
SET_ADMIN_PLANS(state , action){
const {nano , kilo , giga } = action.payload
state.nano = nano
state.kilo = kilo
state.giga = giga


}



  }
});

export const {SET_CHOOSEN_PLAN , SET_ADMIN_PLANS} = planSlice.actions
export const Selectplan = state =>  state.plan.plan
export const Selectprice = state =>  state.plan.price
export const SelectPlanss = state =>  state.plan.planss
export const SelectNano = state => state.plan.nano
export const SelectKilo = state => state.plan.kilo
export const SelectGiga = state => state.plan.giga
export default planSlice.reducer
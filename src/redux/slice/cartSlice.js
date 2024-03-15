import { createSlice } from '@reduxjs/toolkit'

const initialState = {
cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
cartQuantity: localStorage.getItem('cart quan') ? parseInt(localStorage.getItem('cart quan')) : 0,
cartAmount:0,
openCart: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {


OPEN_CART: (state, action) => {
state.openCart = true;

},
CLOSE_CART: (state, action) => {
state.openCart = false;

},
EMPTY_CART: (state, action) => {
state.cart = "";
state.cartQuantity = 0
localStorage.removeItem('cart')
localStorage.removeItem('cart quan')

},

DELETE_PRODUCT: (state, action) => {
const filteredCart = state.cart.filter((item) => {

    return item.id !== action.payload.id
})

state.cart = filteredCart
localStorage.setItem('cart', JSON.stringify(state.cart))
state.cartQuantity -= parseInt(action.payload.quantity);
localStorage.setItem('cart quan', state.cartQuantity)

},





UPDATE_CART: (state, action) => {
const { clickedProduct , quantity ,foundUser, option , calculatequantity} = action.payload;
const updatedCart = state.cart?.findIndex(item => item?.id === clickedProduct?.id)
    if(updatedCart >= 0 ){

state.cart[updatedCart].calculatequantity += calculatequantity; 
state.cart[updatedCart].quantity +=  quantity; 
    }
  
else{
  clickedProduct.calculatequantity = calculatequantity;
  clickedProduct.quantity = quantity;
  clickedProduct.priceWVat = foundUser ? clickedProduct.priceWVat * (1 - foundUser) : clickedProduct.priceWVat
  // clickedProduct.priceWVat = clickedProduct.priceWVat.toString()
  const tempProduct =   {...clickedProduct }
  state.cart.push(tempProduct)
  console.log(tempProduct);

}

localStorage.setItem('cart', JSON.stringify(state.cart))

state.cartQuantity += parseInt(quantity);
localStorage.setItem('cart quan', state.cartQuantity)

















}




  }
});

export const {UPDATE_CART , EMPTY_CART, OPEN_CART , CLOSE_CART ,DELETE_PRODUCT } = cartSlice.actions
export const SelectCart = state => state.cart.cart
export const SelectQuantity = state => state.cart.cartQuantity
export const SelectAmount = state => state.cart.cartAmount
export const SelectOpenCart = state => state.cart.openCart

export default cartSlice.reducer
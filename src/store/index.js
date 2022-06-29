import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth-slice'
import productsSlice from './products-slice'
import cartSlice from './cart-slice'
const store = configureStore(
    {
        reducer: {
            auth: authSlice.reducer,
            products: productsSlice.reducer,
            cart: cartSlice.reducer
        }
    }
)

export default store
import { createSlice } from '@reduxjs/toolkit'
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: []
    },
    reducers: {
        initCart(state, action) {
            return { ...state, products: action.payload }
        },
        addToCart(state, action) {
            return { ...state, products: [...state.products, action.payload] }
        },
        removeFromCart(state, action) {
            return { ...state, products: state.products.filter((pro) => pro.id !== Number(action.payload)) }
        },
        clearCart(state) {
            return { ...state, products: [] }
        }
    }
})

export const cartActions = cartSlice.actions
export default cartSlice
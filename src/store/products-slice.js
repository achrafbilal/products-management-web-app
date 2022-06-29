import { createSlice } from '@reduxjs/toolkit'
const productsSlice = createSlice({
    name: 'products',
    initialState: { products: [], sequence: 1, categories: [] },
    reducers: {
        initProducts(state, action) {
            return { ...state, sequence: state.sequence + action.payload.length, products: action.payload }
        },
        initCategories(state, action) {
            return { ...state, categories: action.payload }
        },
        add(state, action) {
            const product = {
                id: state.sequence,
                ...action.payload
            }
            state.sequence++;
            state.products.push(product)
        },

    }
})

export const productsActions = productsSlice.actions
export default productsSlice
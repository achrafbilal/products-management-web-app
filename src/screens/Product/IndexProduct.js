import axios from 'axios';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { productsActions } from '../../store/products-slice';
import Table from '../../components/Table/Table';

const IndexProduct = () => {
    const state = useSelector(state => state.products)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('http://localhost:3000/products')
            dispatch(productsActions.initProducts(data))
            fetchCategories()
        }
        const fetchCategories = async () => {
            const { data } = await axios.get('http://localhost:3000/categories')
            dispatch(productsActions.initCategories(data))
        }
        fetchProducts()

    }, [])
    return (
        <div className='container  d-flex justify-content-center' style={{ paddingTop: '80px', height: '100vh' }}>
            {
                state.products.length > 0 && state.categories.length > 0 ?
                    <Table products={state.products} categories={state.categories} /> :
                    <div className="d-flex">
                        <h6>
                            No product found
                        </h6>
                    </div>

            }

        </div>
    )
}

export default IndexProduct
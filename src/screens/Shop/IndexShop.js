import React, { useEffect } from 'react'
import Product from '../../components/Product/Product'
import { useDispatch, useSelector } from 'react-redux';
import { productsActions } from '../../store/products-slice';
import axios from 'axios';
import { cartActions } from '../../store/cart-slice';

const IndexShop = () => {
    const products = useSelector(state => state.products.products)

    const dispatch = useDispatch()
    const addToCartHandler = (product) => {
        const fetchData = async () => {
            try {
                const { data } = await axios.post(`http://localhost:3000/cart`, product)
                dispatch(cartActions.addToCart(data))
            } catch (error) {
                alert('Product already in cart')
            }
        }
        fetchData()
    }
    useEffect(() => {
        const getProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/products')
                dispatch(productsActions.initProducts(data))
            } catch (error) {
                console.error(error, 'Problem whith retrieving data from server')
            }

        }

        getProducts()
    }, [])
    return (
        <div className="container" style={{ marginTop: '65px' }}>
            <div className="row container d-flex">
                <div className="col mx-auto justify-content-center d-flex align-items-center">
                    <h6 className='text-center' style={{ color: '#12345680' }}>
                        The maximum quantity is one for each product
                    </h6>
                </div>
            </div>
            <div className='row container d-flex justify-content-start'>
                {
                    products.map((product, index) =>
                        <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-2' key={index}>
                            <Product product={product} mode={{ title: 'shop', action: addToCartHandler }} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default IndexShop
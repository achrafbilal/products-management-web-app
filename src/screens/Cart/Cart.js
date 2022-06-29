import React, { useEffect } from 'react'
import Product from '../../components/Product/Product'
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import axios from 'axios';

const Cart = () => {
    const products = useSelector(state => state.cart.products)
    const dispatch = useDispatch()

    const getDateAfter = (daysLeft) => {
        const today = new Date();
        const shippingDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysLeft)
        return {
            date: shippingDate.toLocaleDateString(),
        }

    }
    const checkout = () => {
        dispatch(cartActions.clearCart())
    }

    const deleteFromCartHandler = (id) => {
        const fetchData = async () => {
            await axios.delete(`http://localhost:3000/cart/${id}`)
            dispatch(cartActions.removeFromCart(id))
        }
        fetchData()
    }
    const getProductsSum = (prods) => {
        return prods.reduce((n, { price }) => n + Number(price), 0)
    }
    const okClickHandler = () => {
        checkout()
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('http://localhost:3000/cart')
            dispatch(cartActions.initCart(data))
        }
        fetchData()
    }, [])
    return (
        <div className="container w-100" style={{ marginTop: '65px' }
        }>
            <div className="row mb-3 pt-3">
                <div className="col-1"></div>
                <div className="col">
                    {products.length === 0 && <h3> You can start shopping by clicking the Shop link</h3>}
                </div>
                <div className="col-1 d-flex justify-content-center align-items-center">
                    {products.length > 0 && <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#modalCheckout"  >Checkout</button>}
                </div>


            </div>
            <div className='row container d-flex justify-content-start h-100'>
                {
                    products.map((product, index) =>
                        <div key={index} className='col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-2'>
                            <Product product={product} mode={{ title: 'cart', action: deleteFromCartHandler }} />
                        </div>
                    )
                }
            </div>

            <div className='modal fade' tabIndex="-1" aria-labelledby="modalCheckoutLabel" id="modalCheckout" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalCheckoutLabel">Checkout</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <h6 className="col-4 text-light bg-success d-flex justify-content-center align-items-center rounded" style={{ height: '30px' }}>
                                    Payed :  ${
                                        getProductsSum(products)
                                    }
                                </h6>
                                <h6 className="col-8  d-flex justify-content-center align-items-center rounded" style={{ height: '30px' }}>
                                    Expected shipping date between
                                </h6>
                            </div>
                            <div className="row mt-3 d-flex justify-content-center align-items-center ">
                                <div className="col d-flex justify-content-center">
                                    <h5>
                                        {
                                            getDateAfter(35).date
                                        }
                                    </h5>

                                </div>
                                <div className="col-1 d-flex justify-content-center mx-4">
                                    <h6>
                                        and
                                    </h6>
                                </div>
                                <div className="col d-flex justify-content-center">
                                    <h5>
                                        {
                                            getDateAfter(42).date
                                        }
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={okClickHandler}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Cart
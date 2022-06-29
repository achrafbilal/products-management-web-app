import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { productsActions } from '../../store/products-slice';
import "./add-product.css"

const AddProduct = () => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.products.categories)
    const [message, setMessage] = useState({ text: "Text default", open: false })
    const SaveProductSubmitHandler = (event) => {
        event.preventDefault();
        const setData = async () => {
            const form = new FormData(event.target)

            const product = {
                title: form.get('title'),
                price: form.get('price'),
                description: form.get('description'),
                image_url: form.get('image_url'),
                category_id: form.get('category_id'),
                qtyStock: form.get('qtyStock'),
            }
            const { data } = await axios.post('http://localhost:3000/products', product)

            dispatch(productsActions.add(data))
            setMessage({
                text: 'Product saved successfully',
                open: true
            })
            setTimeout(() => {
                setMessage({
                    text: "",
                    open: false
                })
            }, 4000)
        }

        setData()
    }

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/categories')
                dispatch(productsActions.initCategories(data))
            } catch (error) {
                console.error(error, 'Problem whith retrieving data from server')
            }
        }
        getCategories()
    }, [])
    return (
        <div className='container  d-flex align-items-center justify-content-center ' style={{ height: `100vh`, paddingTop: '60px' }}>
            <div className="container">

                <form className="container w-50" onSubmit={SaveProductSubmitHandler}>
                    <div className="mb-3 row bor">
                        <h5 className='col-4'>
                            Add new product
                        </h5>
                        <span className="col-3"></span>
                        <h6 className={
                            'col-5 text-success text-end ' + (message.open ? 'show_message' : 'hide_message')
                        }>
                            {message.text}
                        </h6>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label" >Product Title</label>
                        <input type="text" className="form-control" name='title' id="title" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Product Price</label>
                        <input type="number" className="form-control" name='price' id="price" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Product Description</label>
                        <textarea type="text" className="form-control" rows="3" maxLength={90} style={{ resize: 'none' }} name='description' id="description" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image_url" className="form-label">Product Image URL</label>
                        <input type="url" className="form-control" name='image_url' id="image_url" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category_id" className="form-label">Product Category</label>
                        <select className='form-control form-select' name='category_id' id="category_id" required >
                            {
                                categories.map(
                                    (category, index) =>
                                        <option key={index} value={category.id}>
                                            {category.title}
                                        </option>
                                )
                            }

                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="qtyStock" className="form-label">Product Stock quantity</label>
                        <input type="number" className="form-control" name='qtyStock' id="qtyStock" required />
                    </div>

                    <button type='submit' className="btn btn-success">Save</button>

                </form>

            </div>

        </div >
    )
}

export default AddProduct
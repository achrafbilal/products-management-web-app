import React from 'react'
const Product = ({ product, mode }) => {
    const trimText = (text) => {
        const newText = (text + "").substring(0, Math.min(25, (text + "").length))
        return newText + ((newText + "").length < (text + "").length ? " ..." : '')
    }
    return (
        <div className="card w-100 p-2 " >
            <div className="container" style={{ height: '200px' }}>
                <img src={product.image_url} className="card-img-top" alt={product.title} />
            </div>
            <div className="card-body">
                <h5 className="card-title mb-3">{product.title}</h5>
                <p className="card-text mb-3">{trimText(product.description)}</p>
                <h5 className="card-text mb-3">
                    $ {product.price}
                </h5>
                <h5 className="card-text mb-3">
                    {product.qtyStock} left
                </h5>
                {
                    product.qtyStock > 1 && mode.title === 'shop' && <span className="btn btn-secondary mb-3" onClick={() => mode.action(product)}>
                        + Add to cart
                    </span>
                }
                {
                    mode.title === 'cart' && <span className="btn btn-danger" onClick={() => mode.action(product.id)}>Delete from cart</span>
                }
            </div>
        </div>
    )
}

export default Product
import React from 'react'

const Table = ({ products, categories = [] }) => {
    const resolveCategory = (category_id) => {
        return (categories.find(c => c.id === Number(category_id))).title
    }

    return (
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">
                        ID
                    </th>
                    <th scope="col">
                        Title
                    </th>
                    <th scope="col">
                        Description
                    </th>
                    <th scope="col">
                        Category
                    </th>

                    <th scope="col">
                        Quantity in stock
                    </th>

                    <th scope="col">
                        Price
                    </th>

                </tr>
            </thead>
            <tbody>
                {
                    products.map(
                        (row) =>
                            <tr key={row.id}>
                                <th scope="row">
                                    {
                                        row.id
                                    }
                                </th>
                                <td>
                                    {row.title}
                                </td>
                                <td>
                                    {row.description}
                                </td>
                                <td>
                                    {resolveCategory(row.category_id)}
                                </td>
                                <td>
                                    {row.qtyStock}
                                </td>
                                <td>
                                    $ {row.price}
                                </td>
                            </tr>
                    )
                }

            </tbody>
        </table>
    )
}

export default Table
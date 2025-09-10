import getProducts from '@/apis/products.api'
import { productInterfaces } from '@/interfaces/Product.interfaces'
import React from 'react'
import Productitem from './Productitem'


export default async function FeaturedProducts() {

    const data: productInterfaces[] = await getProducts()


    return (
        <div className='flex flex-wrap'>
            {data.map((prod: productInterfaces) => <Productitem key={prod._id} prod={prod}></Productitem>)}
        </div>
    )
}

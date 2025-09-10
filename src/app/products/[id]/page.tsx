import getSingleProducts from '@/apis/singleproduct.api'
import { productInterfaces } from '@/interfaces/Product.interfaces'
import Image from 'next/image'
import React from 'react'
import ProductItemBtn from '../_component/productitemBtn'

export default async function page({params}:{params:{id:string}}) {
    const {id} = params
    const data: productInterfaces = await getSingleProducts(id)
    return (
        <div className='flex flex-wrap items-center'>
            <div className='w-full md:w-1/3'>
            <Image src={data.imageCover} width={300} height={300} className='object-cover w-full' alt='' />
            </div>
            <div className='w-full md:w-2/3 p-5'>
                <h3>{data.title}</h3>
                <p className='text-gray-400 my-3'>{data.description}</p>
                <p>{data.category.name}</p>
                <div className='flex justify-between my-5 items-center'>
                    <span>{data.price} EGP</span>
                    <span>{data.ratingsAverage}<i className='fa-solid fa-star text-rating'></i></span>
                </div>
                <ProductItemBtn id={data._id}></ProductItemBtn>
            </div>
        </div>
    )
}

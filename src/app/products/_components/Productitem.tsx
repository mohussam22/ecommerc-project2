import { Button } from '@/components/ui/button'
import { productInterfaces } from '@/interfaces/Product.interfaces'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductItemBtn from '../_component/productitemBtn'
import Heartitem from '@/app/_components/Heartitem'

export default function Productitem({ prod }: { prod: productInterfaces }) {
    
    return (
        <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/6'>
            <div className='p-5'>
                <Heartitem></Heartitem>
                <Link href={`/products/${prod._id}`}>
                    <Image width={300} height={300} src={prod.imageCover} className='w-full' alt={prod.title} />
                    <span className='text-main'>{prod.category.name}</span>
                    <p className='line-clamp-1'>{prod.title}</p>
                    <div className='flex justify-between my-5 items-center'>
                        <div>
                            <div className={prod?.priceAfterDiscount&&'line-through'}>{prod.price} EGP</div>
                         {prod.priceAfterDiscount&& <span>{prod.priceAfterDiscount} EGP</span>}
                        </div>
                        <span>{prod.ratingsAverage}<i className='fa-solid fa-star text-rating'></i></span>
                    </div>
                </Link>

                <ProductItemBtn id={prod._id}></ProductItemBtn>
            </div>
        </div>
    )
}

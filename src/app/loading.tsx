'use client'
import React from 'react'
import { Puff } from 'react-loader-spinner'

export default function Loading() {
    return (
        <div className='flex h-[90%] justify-center items-center'>  
        <Puff
            visible={true}
            height="100"
            width="100"
            color="rgb(10, 173, 10)"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
        </div>
    )
}

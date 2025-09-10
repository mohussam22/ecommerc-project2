'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import logo from '../../../../assets/images/freshcart-logo.svg'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { CartRes } from '../cart/typescript/cart.interfaces'
export default function Navbar() {
    const { data } = useQuery<CartRes>({
        queryKey: ['cart'], queryFn: async () => {
            const res = await fetch('/api/cart')
            const payload = await res.json()
            return payload
        }
    })
    const [isOpen, setOpen] = useState(true)
    const { data: session, status } = useSession()

    const link = [
        { path: '/products', element: 'product' },
    ]
    const auths = [
        { path: '/auth/login', element: 'login' },
        { path: '/auth/register', element: 'register' },
    ]

    function handleLogOut() {
        signOut({ callbackUrl: '/' })
    }

    return (
        <div>

            <nav className="bg-light w-full border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap gap-5 md:flex-nowrap items-center mx-auto p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">

                        <Image src={logo} alt='freshcart' />
                    </Link>
                    <button onClick={() => setOpen(!isOpen)} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`${isOpen && 'hidden'}justify-between w-full md:flex`} id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row gap-5 md:mt-0 md:border-0 dark:bg-gray-800 dark:border-gray-700">
                            {link.map(link => (
                                <li key={link.path}>
                                    <Link href={link.path} className="text-gray-500 block py-2 px-3 rounded-sm md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">{link.element.toUpperCase()}</Link>
                                </li>
                            ))}
                        </ul>

                        <ul className="font-medium flex flex-col md:flex-row p-4 md:p-0 mt-4 md:mt-0 gap-5 border border-gray-100 md:border-0 rounded-lg dark:bg-gray-800 dark:border-gray-700 md:ms-auto">
                            <li><i className='fa-brands fa-facebook'></i></li>
                            <li><i className='fa-brands fa-twitter'></i></li>
                            <li><i className='fa-brands fa-google'></i></li>

                            {status === 'authenticated' ? (
                                <>
                                    <li>Hi {session?.user?.name}</li>
                                    <li className='cursor-pointer' onClick={handleLogOut}>LogOut</li>
                                    <li>
                                        <Link href={'/cart'} className='relative'>
                                            <i className='fa-solid fa-cart-shopping'></i>
                                            <span className='absolute -top-2 -right-2 text-xs bg-black text-white rounded-full px-1'>
                                                {data?.numOfCartItems}
                                            </span>
                                        </Link>
                                    </li>
                                    {session?.user.image && (
                                        <li>
                                            <img className='size-[25px] rounded-full' src={session?.user.image} alt="user" />
                                        </li>
                                    )}
                                </>
                            )
                                : (
                                    <>
                                        {auths.map(link => (
                                            <li key={link.path}>
                                                <Link href={link.path} className="text-gray-500 block py-2 px-3 rounded-sm md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500">
                                                    {link.element.toUpperCase()}
                                                </Link>
                                            </li>
                                        ))}
                                    </>
                                )}
                        </ul>

                    </div>
                </div>
            </nav>


        </div>
    )
}

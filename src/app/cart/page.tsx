import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import Cart from './_components/Cart'

export default async function page() {
    
  return (
    <>
      <Cart/>
    </>
  )
}
 
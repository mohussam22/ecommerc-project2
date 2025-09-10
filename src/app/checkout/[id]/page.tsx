import React from 'react'
import CheckOut from '../_componenets/CheckOut'

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <CheckOut cartId={params.id} />
    </div>
  )
}


'use client'

import { addproduct } from '@/apis/cart/_actions/addproduct.action'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-toastify'

export default function ProductItemBtn({ id }: { id: string }) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: addproduct,
    onSuccess: (data) => {
      toast.success(data?.message || 'Added to cart');
      queryClient.invalidateQueries({queryKey:['cart']})
    },
    onError: () => {
      toast.error('Login first!');
    },
  });

  return (
    <Button className='w-full' onClick={() => mutate(id)}>
      {isPending ? <i className='fa-solid fa-spin fa-spinner'></i> : "Add To Cart"}
    </Button>
  )
}

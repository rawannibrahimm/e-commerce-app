"use client"

import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { addToCart } from '@/app/_actions/cart.actions'
import { ProductI } from '@/interfaces/products'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function AddToCartBtn({ product }: { product: ProductI }) {

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: addToCart,
        onSuccess: (response) => {
            if (response?.status === "success") {
                toast.success(response.message)
                queryClient.invalidateQueries({ queryKey: ['cart'] })
            }
        },
        onError: (error: any) => {
            toast.error(error?.message || "An unexpected error occurred")
        }
    })

    return (
        <Button
            disabled={isPending}
            onClick={() => mutate(product._id)}
            className="w-10/12 bg-[#2a5631] hover:bg-[#16371b] cursor-pointer"
        >
            {isPending ? <Spinner /> : <>Add to cart <ShoppingCart /></>}
        </Button>
    )
}
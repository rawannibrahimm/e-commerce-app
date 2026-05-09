"use client"

import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { addToCart } from '@/app/_actions/cart.actions'
import { ProductI } from '@/interfaces/products'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export default function AddToCartBtn({ product }: { product: ProductI }) {

    const queryClient = useQueryClient()
    const { status } = useSession()
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
            // onClick={() => mutate(product._id)}
            onClick={() => {
            if (status !== "authenticated") {
                toast.error("You are not logged In. Please log-In First!")
                return
                }
                mutate(product._id)
            }}
            className="w-10/12 bg-[#2a5631] hover:bg-[#16371b] cursor-pointer"
        >
            {isPending ? <Spinner /> : <>Add to cart <ShoppingCart /></>}
        </Button>
    )
}
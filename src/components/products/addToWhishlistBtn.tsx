"use client"

import { addToWhishlist } from "@/app/_actions/whishlist.actions";
import { ProductI } from "@/interfaces/products";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner"; 
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useGetWhishlist from "@/hooks/useWhishlist";

export default function AddToWhishlistBtn({ product }: { product: ProductI }) {
    // const [isLoading, setIsLoading] = useState(false);
    // const [isWishlisted, setIsWishlisted] = useState(false);
    const { data: wishlist } = useGetWhishlist()
    const isWishlisted = wishlist?.data?.some(
        (item: ProductI) => item._id === product._id
    )
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: addToWhishlist,
        onSuccess: (response) => {
            if (response?.status === "success") {
                console.log(response)
                toast.success(response.message)
                queryClient.invalidateQueries({ queryKey: ['whishlist'] })
                // setIsWishlisted(true);
            }
        },
        onError: (error: any) => {
            toast.error(error?.message || "An unexpected error occurred")
        }
    })

    // const handleClick = async () => {
    //     if (isLoading) return; 

    //     try {
    //         setIsLoading(true);
    //         const response = await addToWhishlist(product._id);
    //         // console.log(response)
    //         if (response?.status === "success") {
    //             toast.success(response?.message);
    //             setIsWishlisted(true);
    //         }
    //     } catch (error) {
    //         if (error instanceof Error) {
    //         toast.error(error.message);
    //         } else {
    //             toast.error("An unexpected error occurred");
    //         }
    //     } finally {
    //         setIsLoading(false);
    // }};

    return (
    <>
    <div className="flex items-center justify-center w-7 h-7">
        {isPending ? (<Spinner className="w-5 h-5" />) : (
        <Heart onClick={() => mutate(product._id)} size={28} className={`transition cursor-pointer 
            ${isWishlisted ? "fill-red-600/80 text-red-600/80 pointer-events-none" : ""}`}
        />)}
    </div>
    </>
    );
}
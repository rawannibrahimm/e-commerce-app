import { useState } from 'react'
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { CartProductI } from '@/interfaces/cart';
import { removeSpecificCartItem, updateCartProductQuantity } from '@/app/_actions/cart.actions';
import { useQueryClient } from '@tanstack/react-query';

type CartItemProps = {
    item: CartProductI
    isClearing: boolean
}

export default function CartItem({ item, isClearing }: CartItemProps) {
    
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    // To delete an item 
    async function deleteCartProduct(productId:string){
        try {
            setIsLoading(true)
            const data = await removeSpecificCartItem(productId)
            // console.log(data)
            queryClient.invalidateQueries({
                queryKey: ['cart'],
            })
        } catch (error) {
            console.log(error)
        }
        finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 5000);
            
        }
    }
    // To increase or decrease quantity of product
    async function updateProductQuantity(productId:string, newCount:number){
        try {
            setIsUpdating(true)
            const data = await updateCartProductQuantity(productId, newCount)
            console.log(data)
            queryClient.invalidateQueries({
                queryKey: ['cart'],
            })
        } catch (error) {
            console.log(error)
        }
        finally {
            setTimeout(() => {
                setIsUpdating(false)
            }, 1000);
            
        }
    }

    return (
    <>
        <div key={item.product._id} className={`relative grid grid-cols-5 items-center px-6 py-5 
            transition ${isLoading ? "opacity-50 pointer-events-none" : ""}`}>
            {/* Product */}
            <div className="col-span-2 flex items-center gap-4">
                <button onClick={()=>{deleteCartProduct(item.product._id)}} className='cursor-pointer'> <X size={18} /> </button>
                    <Image src={item.product.imageCover} alt={item.product.title} width={70} height={70}
                        className="rounded-lg object-cover aspect-square"/>
            <div>
                <h3 className="font-semibold">{item.product.title}</h3>
                <p className="text-sm text-gray-500">{item.product.category.name}</p>
            </div>
        </div>        

        {/* Price */}
        <div className="col-span-1"> 
            <p className="font-medium">{item.price} EGP</p>
        </div>

        {/* Quantity */}
        <div className="relative col-span-1 flex items-center border rounded-full w-fit mt-2">
            {/* Overlay */}
            {isUpdating && (
                <div className="absolute inset-0 bg-white/60  flex items-center justify-center z-10 rounded-full">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full "></div>
                </div>
            )}  
            <button onClick={()=>{ updateProductQuantity(item.product._id, item.count - 1)}} className="px-3 py-1 cursor-pointer"> 
                <Minus size={14} />
            </button>
            <span className="px-3">{item.count}</span>
            <button onClick={()=>{ updateProductQuantity(item.product._id, item.count + 1)}} className="px-3 py-1 cursor-pointer">
                <Plus size={14} />
            </button>
        </div>

        {/* Subtotal */}
        <div className="col-span-1 font-medium text-center">
            {(item.price * item.count).toFixed(2)} EGP
        </div>

        {/* Overlay while deleting item */}
        {(isLoading || isClearing ) && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10"></div>
        )}
        </div>
    </>
    )
}

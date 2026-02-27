import { removeProductFromWhishlist } from '@/app/_actions/whishlist.actions'
import { ProductI } from '@/interfaces/products'
import { useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import AddToCartBtn from '../products/addToCartBtn'

export default function WhishlistItem({item}:{item: ProductI}) {
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)
    async function deleteWhishlistProduct(productId:string){
        try {
            setIsLoading(true)
            const data = await removeProductFromWhishlist(productId)
            // console.log(data)
            queryClient.invalidateQueries({
                queryKey: ['whishlist'],
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
    return (
    <>
    <div key={item._id} className={`relative grid grid-cols-5 items-center px-6 py-5 
            transition ${isLoading ? "opacity-50 pointer-events-none" : ""}`}>
            {/* Product */}
            <div className="col-span-2 flex items-center gap-4">
                <button onClick={()=>{deleteWhishlistProduct(item._id)}} className='cursor-pointer'> <X size={18} /> </button>
                    <Image src={item.imageCover} alt={item.title} width={70} height={70}
                        className="rounded-lg object-cover aspect-square"/>
            <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.category.name}</p>
            </div>
        </div>        

        {/* Price */}
        <div className="col-span-1"> 
            <p className="font-medium">{item.price.toFixed(2)} EGP</p>
        </div>

        <div className="relative col-span-2 ">
            <AddToCartBtn product={item}/>
        </div>


        {/* Overlay while deleting item */}
        {(isLoading) && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10"></div>
        )}
        </div>
    </>
    )
}

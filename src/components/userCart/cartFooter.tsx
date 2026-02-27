import { clearUserCart } from "@/app/_actions/cart.actions"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "../ui/button"

type CartFooterProps = {
    setIsClearing: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CartFooter({ setIsClearing }: CartFooterProps) {
    const queryClient = useQueryClient()
    // To delete an item 
    async function clearAllCartItems(){
        try {
            setIsClearing(true)
            const data = await clearUserCart()
            console.log(data)
            queryClient.invalidateQueries({
                queryKey: ['cart'],
            })
        } catch (error) {
            console.log(error)
        }
        finally {
            setTimeout(() => {
                setIsClearing(false)
            }, 5000);
            
        }
    }
    return (
    <>
        <div className="flex flex-col md:flex-row gap-4 mt-6">
            <input placeholder="Coupon Code" className="border rounded-full px-4 py-2 flex-1 outline-none" />

            <button className="bg-[#2a5631] hover:bg-[#16371b] text-white px-6 py-2 rounded-full transition">
                Apply Coupon
            </button>

            <Button variant="link" onClick={()=> clearAllCartItems()} className="text-[#2a5631] font-medium text-lg ml-auto cursor-pointer ">
                Clear Shopping Cart
            </Button>
        </div>
    </>
    )
}

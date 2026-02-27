import OrderCard from "@/components/orders/OrderCard"
import { OrderI } from "@/interfaces/orders"
import { getUserOrders } from "@/services/orders.services"
import { ReceiptText } from "lucide-react"

export default async function AllOrders() {
    
    const data = await getUserOrders()
    const orders: OrderI[] = data?? []

    return (
    <>
    {orders.length === 0 ? (
        <div className="h-[80vh] flex flex-col items-center justify-center gap-4 text-center">
            <ReceiptText  size={80} className="text-gray-300" />
            <h2 className="text-xl font-semibold">Your Orders are empty</h2>
            <p className="text-gray-500 text-lg">
                Looks like you haven’t added anything yet.
            </p>
        </div>
        ) : (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid gap-6  sm:grid-cols-1 ">
                {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
            ))}
        </div>
        </div>
    )}
    </>
    )
}

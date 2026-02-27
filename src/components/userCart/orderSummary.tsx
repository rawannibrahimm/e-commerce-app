"use client"
import { CartI } from '@/interfaces/cart'
import CheckoutDialog from '../checkout/checkoutDialog'
import CashCheckoutDialog from '../checkout/cashCheckoutDialog'

export default function OrderSummary({ cart }: { cart: CartI }) {
    const totalItems = cart.data.products.reduce((accu, product)=> product.count + accu, 0)
    return (
    <>
        <div className="border rounded-xl p-6 h-fit">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Items</span>
                    <span className="font-semibold">{totalItems}</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-gray-500">SubTotal</span>
                    <span className="font-semibold">{cart.data.totalCartPrice.toFixed(2)} EGP</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Shipping</span>
                    <span className="font-semibold">$0.00</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Taxes</span>
                    <span className="font-semibold">$0.00</span>
                </div>

                <div className="flex justify-between text-red-500">
                    <span className="font-medium text-gray-500">Coupon Discount</span>
                    <span className="font-semibold">None</span>
                </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-semibold mb-5">
                <span>Total</span>
                <span>{cart.data.totalCartPrice.toFixed(2)} EGP</span>
            </div>
            <div className="flex flex-col gap-3">
                <CheckoutDialog cartId={cart.cartId}/>
                <CashCheckoutDialog cartId={cart.cartId}/>
            </div>
            
        </div>
    </>
    )
}

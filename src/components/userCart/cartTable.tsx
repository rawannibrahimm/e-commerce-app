"use client"
import { CartI, CartProductI } from "@/interfaces/cart";
import CartHeader from "./cartHeader";
import CartItem from "./cartItem";
import CartFooter from "./cartFooter";
import { useState } from "react";


export default function CartTable({ cart }: { cart?: CartI }) {
    const [isClearing, setIsClearing] = useState<boolean>(false)
    const products = cart?.data?.products?? [];

    return (
    <>
        <div className="md:col-span-2">
            {/* Header */}
            <CartHeader/>
            {/* Items */}
            <div className="border rounded-b-xl divide-y">
            {products.map((item: CartProductI) => (
                <CartItem key={item.product._id} item={item} isClearing={isClearing}/>
            ))}
            </div>
            {/* Coupon & Clear cart */}
            <CartFooter setIsClearing={setIsClearing}/>
        </div>
    </>
    )
}

"use client"
import WhishlistHeader from "./whishlistHeader";
import { WhishlistI } from "@/interfaces/whishlist";
import WhishlistItem from "./whishlistItem";
import { ProductI } from "@/interfaces/products";


export default function WhishlistTable({ whishlist }: { whishlist?: WhishlistI }) {
    const products = whishlist?.data?? [];

    return (
    <>
        <div className="md:col-span-2">
            {/* Header */}
            <WhishlistHeader/>
            {/* Items */}
            <div className="border rounded-b-xl divide-y">
            {products.map((item: ProductI) => (
                <WhishlistItem key={item._id} item={item} />
            ))}
            </div>
        </div>
    </>
    )
}

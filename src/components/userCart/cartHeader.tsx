
export default function CartHeader() {
    return (
    <>
        <div className="grid grid-cols-5 bg-[#2a5631] text-white px-6 py-3 rounded-t-xl font-medium">
            <span className="col-span-2">Product</span>
            <span className="col-span-1">Price</span>
            <span className="col-span-1 ">Quantity</span>
            <span className="col-span-1 text-center">Subtotal</span>
        </div>
    </>
    )
}

"use client";

import CartSpinner from "@/components/userCart/cartSpinner";
import CartTable from "@/components/userCart/cartTable";
import OrderSummary from "@/components/userCart/orderSummary";
import useGetCart from "@/hooks/useCart";
import { ShoppingBasket } from "lucide-react";

export default function UserCart() {

  // async function getUserCart(){
  //   const data = await getLoggedUserCart()
  //   console.log(data)
  // }
  
  // useEffect(() => {
  //   getUserCart()
  // }, [])
  

  const { data, isLoading, isFetching } = useGetCart();
  const products = data?.data?.products ?? [];
  const hasProducts = products.length > 0;

  if (isLoading || (isFetching && !hasProducts)) {
    return <CartSpinner/>
  }

  return (
    <>
    {!hasProducts ? (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4 text-center">
        <ShoppingBasket size={80} className="text-gray-300" />
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="text-gray-500 text-lg">
          Looks like you haven’t added anything yet.
        </p>
      </div>
    ) : (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <CartTable cart={data} />
          <OrderSummary cart={data} />
        </div>
      </div>
    )}
  </>
  );
}


"use client"

import WhishlistSpinner from '@/components/userWhishlist/whishlistSpinner';
import WhishlistTable from '@/components/userWhishlist/whishlistTable';
import useGetWhishlist from '@/hooks/useWhishlist'
import FeaturesBar from "@/components/common/featuresbar"
import { Heart } from 'lucide-react';

export default function UserWhishlist() {
    const {data, isLoading, isFetching} = useGetWhishlist()
    // console.log(data)
    const products = data?.data?? [];
    const hasProducts = products.length > 0;

    if (isLoading || (isFetching && !hasProducts)) {
        return <WhishlistSpinner/>
    }
    return (
    <>
    {!hasProducts ? (
    <div className="h-[80vh] flex flex-col items-center justify-center gap-4 text-center">
        <Heart size={80} className="text-gray-300" />
        <h2 className="text-xl font-semibold">Your whishlist is empty</h2>
        <p className="text-gray-500 text-lg">
            Looks like you haven’t added anything yet.
        </p>
    </div>
    ) : (
    <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
            <WhishlistTable whishlist={data} />
            <FeaturesBar/>
        </div>
    </div>
    )}
    </>
    )
}

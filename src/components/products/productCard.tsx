// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import Image from 'next/image'
import { PoundSterling, Star, StarHalf } from 'lucide-react'
import { ProductI } from '@/interfaces/products'
import Link from 'next/link'
import AddToCartBtn from './addToCartBtn'
import AddToWhishlistBtn from './addToWhishlistBtn'
import { formatProductTitle } from '@/lib/productTitleFix'

export default async function ProductCard({ product }: { product: ProductI }) {
    
    const rating = product.ratingsAverage;
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;
    const hasHalfStar = decimal >= 0.5;

    return (
        <>
            <Card className="relative h-full mx-auto w-full max-w-sm pt-0">
                <Link href={`/products/${product._id}`}>
                <div className="absolute pointer-events-none inset-0 z-30 aspect-square rounded-xl" />
                <Image src={product.imageCover} width={300} height={300} priority alt={product.title}
                className="relative max-h-80 p-1 rounded-3xl z-20 aspect-square mx-auto object-cover" 
                />
                <CardHeader>
                    <CardDescription>{product.brand.name}</CardDescription>
                    <CardTitle>{formatProductTitle(product.title)}</CardTitle>
                    <CardDescription>{product.category.name}</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col gap-2'>
                    <div className="flex gap-1 items-center">
                        <PoundSterling size={25} strokeWidth={3} color="#B58D47" />
                        <p className='text-2xl font-semibold'>{product.price}</p>
                    </div>
                    <div className='flex gap-0.5 items-center'>
                    {/* Full stars */}
                    {[...Array(fullStars)].map((_, index) => (
                        <Star key={`full-${index}`} className="size-5 text-yellow-500 fill-yellow-500"/>
                    ))}
                    {/* Half star */}
                    {hasHalfStar && (
                    <StarHalf className="size-5 text-yellow-500 fill-yellow-500" />)}
                    <span className='ms-2 text-xl text-stone-500'>{product.ratingsAverage}</span>
                    </div>
                </CardContent>
                </Link>
                <CardFooter className='flex items-center gap-5 cursor-default my-auto'>
                    <AddToCartBtn product={product}/>
                    <AddToWhishlistBtn product={product}/>
                </CardFooter>
            </Card>
        </>
    )
}

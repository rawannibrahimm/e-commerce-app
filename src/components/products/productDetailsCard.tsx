import { ProductI } from '@/interfaces/products'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import Image from 'next/image'
import { PoundSterling, Star, StarHalf } from 'lucide-react'
import AddToWhishlistBtn from './addToWhishlistBtn'
import AddToCartBtn from './addToCartBtn'
import { notFound } from 'next/navigation'

export default function ProductDetailsCrad({product}:{product: ProductI}) {

    if (!product) {
        notFound();
    }
    
    const rating = product?.ratingsAverage;
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;
    const hasHalfStar = decimal >= 0.5;

    return (
        <>
        <Card className="relative w-full col-span-12 pt-0 grid grid-cols-12 gap-6 p-4">
            <div className="absolute pointer-events-none inset-0 rounded-xl" />
            {/* Image section */}
            <div className="col-span-12 md:col-span-4 flex justify-center items-start">
                <Carousel opts={{
                align: "start",
                loop: true,
                }}>  
                    <CarouselContent>
                        {product.images.map((img, index) => (
                        <CarouselItem key={img || index}>
                            <Image src={img} width={400} height={400} priority alt={product.title}
                            className="relative max-h-96 p-1 rounded-3xl z-20 aspect-square object-cover"/>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className= "absolute text-amber-50 left-3 top-1/2 -translate-y-1/2 z-20 bg-[#507055] hover:bg-amber-50 shadow"/>
                    <CarouselNext className="absolute text-amber-50 right-3 top-1/2 -translate-y-1/2 z-20 bg-[#507055] hover:bg-amber-50 shadow" />
                </Carousel>
            </div>
            {/* Details section */}
            <div className="col-span-12 md:col-span-8 flex flex-col justify-between">
                <div className='my-auto'>
                    <CardHeader className="px-0">
                        <CardDescription>{product.brand.name}</CardDescription>
                        <CardTitle className="text-2xl">{product.title}</CardTitle>
                        <CardDescription>{product.category.name}</CardDescription>
                        <CardDescription className="text-lg text-black">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3 px-0">
                        <div className="flex gap-1 items-center">
                            <PoundSterling size={25} strokeWidth={3} color="#B58D47" />
                            <p className="text-3xl font-semibold">{product.price}</p>
                        </div>
                        <div className="flex gap-0.5 items-center">
                            {/* Full stars */}
                            {[...Array(fullStars)].map((_, index) => (
                            <Star key={`full-${index}`} className="size-5 text-yellow-500 fill-yellow-500" />
                        ))}

                            {/* Half star */}
                            {hasHalfStar && (
                            <StarHalf className="size-5 text-yellow-500 fill-yellow-500" />)}

                            <span className="ms-2 text-xl text-stone-500">{product.ratingsAverage}</span>
                        </div>
                    </CardContent>
                </div>

                <CardFooter className="flex items-center gap-5 px-0 pt-4">
                    <AddToCartBtn product={product}/>
                    {/* <Button className="w-9/12 bg-[#2a5631] hover:bg-[#16371b] cursor-pointer">Add to cart <ShoppingCart /></Button> */}
                    <AddToWhishlistBtn product={product}/>
                </CardFooter>
            </div>
        </Card>
        </>

    )
}

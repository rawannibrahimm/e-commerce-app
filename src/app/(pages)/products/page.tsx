import ProductCard from '@/components/products/productCard'
import { ProductI } from '@/interfaces/products'
import { getAllProducts } from '@/services/products.services'
// import Link from 'next/link'

// products page
export default async function Products() {
    const {data} = await getAllProducts()
    const products: ProductI[] = data
    // console.log(data)

    return (
        <>  
            <main className="min-h-screen max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 mx-auto">
                <div className="grid grid-cols-12 space-x-5 space-y-5 ">
                    {products.map(product => (
                        <div key={product._id} className="col-span-12 md:col-span-6 lg:col-span-4 cursor-pointer">
                            {/* The whole card is wrapped in a <Link> - The button visually looks like a button*/}
                            {/* The browser treats everything inside as one big anchor (<a>) - The button becomes “fake-interactive”*/}
                            {/* This is invalid HTML semantics (interactive inside interactive) */}
                            {/* Make only the card body/image/title clickable */}
                            {/* <Link href={`/products/${product._id}`}> */}
                            <ProductCard product={product} />
                            {/* </Link> */}
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
} 



import ProductDetailsCrad from '@/components/products/productDetailsCard'
import { ProductI } from '@/interfaces/products'
import { getSpecificProduct } from '@/services/products.services'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,} from "@/components/ui/breadcrumb"
import Link from 'next/link'

interface ProductIdType {
    productId : string
}

export default async function ProductDetails({params}: {params: Promise<ProductIdType>}) {

    const {productId} = await params
    console.log(productId)
    const {data} = await getSpecificProduct(productId)
    console.log(data)
    const product:ProductI = data

    return (
    <>
        <main className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 mx-auto">
                <div className="grid grid-cols-12 space-x-5 ">
                    <div className="col-span-12">
                        <Breadcrumb className='flex'>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild >
                                    <Link href="/" className="text-lg">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild >
                                    <Link href="/products" className="text-lg">Products</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className='text-lg font-semibold text-[#2a5631]'>Product Details</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    </div>
                    <div className="col-span-12 mt-4">
                        <ProductDetailsCrad product={product}/>
                    </div>
                    
                </div>
        </main>
        
    </>
    )
}

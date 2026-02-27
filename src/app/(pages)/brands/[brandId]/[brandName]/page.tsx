import ProductCard from '@/components/products/productCard'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { ProductI } from '@/interfaces/products'
import { getProductsByBrand } from '@/services/products.services'
import Link from 'next/link'

interface ParamsType {
    brandId : string,
    brandName: string
}

export default async function BrandDetails({params}: {params: Promise<ParamsType>}) {
    const { brandId, brandName } = await params
    console.log(brandId)
    const {data} = await getProductsByBrand(brandId)
    const products: ProductI[] = data
    
    return (
        <>
        <main className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 mx-auto">
                <div className="grid grid-cols-12 gap-5 ">
                    <div className="col-span-12">
                        <Breadcrumb className='flex'>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild  >
                                    <Link href="/" className="text-lg">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/brands" className="text-lg">Brands</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className='text-lg font-semibold text-[#2a5631]'>{decodeURIComponent(brandName)}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    </div>
                    <div className="col-span-12 grid grid-cols-12 gap-5 mt-6">
                        {products?.length > 0 ? (
                            products.map((product) => (
                            <div key={product._id} className="col-span-12 md:col-span-6 lg:col-span-4">
                                <ProductCard product={product} />
                            </div>
                            ))
                            ) : (
                            <p className="col-span-12 text-center text-2xl text-gray-500">
                                No products found for this brand.
                            </p>
                        )}
                    </div>
                </div>
        </main>
        </>
    )
}

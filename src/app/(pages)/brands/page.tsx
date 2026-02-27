import BrandCard from '@/components/brands/brandCard'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { BrandI } from '@/interfaces/brands'
import { getAllBrands } from '@/services/brands.services'
import Link from 'next/link'

export default async function Brands() {
    const {data} = await getAllBrands()
    const brands: BrandI[] = data
    console.log(data)
    
    return (
        <>
        <main className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 mx-auto">
                <div className="grid grid-cols-12 space-x-5 ">
                    <div className="col-span-12">
                        <Breadcrumb className='flex'>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/" className="text-lg">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className='text-lg font-semibold text-[#2a5631]'>Brands</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    </div>
                    <div className="col-span-12 mt-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {brands.map((brand) => (
                            <BrandCard key={brand._id} brand={brand} />
                        ))}
                        </div>
                    </div>
                </div>
        </main>
        </>
    )
}

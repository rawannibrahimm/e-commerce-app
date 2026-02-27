import CategoryCard from '@/components/categories/categoryCard'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { CategoryI } from '@/interfaces/categories'
import { getAllCategories } from '@/services/categories.services'
import Link from 'next/link'

export default async function Categories() {
    const {data} = await getAllCategories()
    const categories: CategoryI[] = data
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
                                <BreadcrumbPage className='text-lg font-semibold text-[#2a5631]'>Categories</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    </div>
                    <div className="col-span-12 mt-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <CategoryCard key={category._id} category={category} />
                        ))}
                        </div>
                    </div>
                </div>
        </main>
        </>
    )
}

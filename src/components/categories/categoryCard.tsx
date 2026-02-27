import Link from "next/link";
import { Card, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { CategoryI } from "@/interfaces/categories";

export default async function CategoryCard({category}:{category:CategoryI}) {
    return (
        <Card className="relative h-full mx-auto w-full max-w-sm pt-0 overflow-hidden">
            <Link href={`/categories/${category._id}/${encodeURIComponent(category.name)}`} className="block">
                <div className="absolute pointer-events-none inset-0 z-30 rounded-xl" />
                
                {/* Fixed size container for images */}
                <div className="relative w-full h-48 md:h-56 lg:h-64">
                    <Image 
                        src={category.image} 
                        alt={category.name}
                        fill
                        priority 
                        className="object-cover rounded-2xl rounded-t-xl p-1" 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                
                <CardHeader>
                    <CardTitle className="text-center">{category.name}</CardTitle>
                </CardHeader>
            </Link>
        </Card>
    )
}
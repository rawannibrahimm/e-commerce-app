import Link from "next/link";
import { Card, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { BrandI } from "@/interfaces/brands";

export default async function BrandCard({brand}:{brand:BrandI}) {
    return (
    <>
        <Card className="relative h-full mx-auto w-full max-w-sm pt-0">
                <Link href={`/brands/${brand._id}/${encodeURIComponent(brand.name)}`}>
                <div className="absolute pointer-events-none inset-0 z-30 aspect-square rounded-xl" />
                <Image src={brand.image} width={250} height={250} priority alt={brand.name}
                className="relative max-h-80 p-1 rounded-3xl z-20 mx-auto object-contain" 
                />
                <CardHeader>
                    <CardTitle className="text-center">{brand.name}</CardTitle>
                </CardHeader>
                
                </Link>
            </Card>
    </>
    )
}

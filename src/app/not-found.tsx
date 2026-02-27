import { Button } from '@/components/ui/button';
import { ShieldX } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
    <>
    <div className="h-[80vh] flex flex-col items-center justify-center gap-4 text-center">
        <ShieldX size={80} className="text-gray-300" />
        <h2 className="text-xl font-semibold">404 Page Not Found</h2>
        <Button variant="link">
            <Link href="/products" className="text-[#B58D47] text-xl">View All Products</Link>
        </Button>
    </div>
    </>
    )
}

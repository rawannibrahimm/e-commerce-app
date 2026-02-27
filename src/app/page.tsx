import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center p-30 dark:bg-black ">
        <div className="heading text-center">
          <h1 className="text-5xl text-black font-bold">Welcome to <span className="text-[#B58D47]">Comercio</span></h1>
            <div className="heading-info mt-8">
              <p className="font-semibold text-xl text-gray-500">Discover the latest technology,fashion, and lifestyle products.</p>
              <p className="font-semibold text-xl text-gray-500">High Quality, Fast shippng & excellent customer service.</p>
            </div>
        </div>
        <div className="btns mt-7 flex gap-4 items-center">
          <Button size={'lg'} data-icon="inline-end" className="text-xl bg-[#2a5631] hover:bg-[#16371b] p-6 ">Shop Now <ArrowRightIcon/></Button>
          <Button variant="link">
            <Link href="/products" className="text-[#B58D47] text-xl">View All Products</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

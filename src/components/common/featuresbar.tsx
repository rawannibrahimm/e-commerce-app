
import { Package, CreditCard, Headphones } from "lucide-react"

const features = [
    {
    title: "Free Shipping",
    desc: "Free shipping for order above 1000 EGP",
    icon: Package,
    },
    {
    title: "Flexible Payment",
    desc: "Multiple secure payment options",
    icon: CreditCard,
    },
    {
    title: "24×7 Support",
    desc: "We support online all days.",
    icon: Headphones,
    },
]

export default function FeaturesBar() {
    return (
    <>
    <section className="w-full h-fit py-8">
        <div className="container bg-gray-100/20  my-auto mx-auto p-4">
            <div className="grid gap-6 md:grid-rows-3">
            {features.map((item, i) => {
                const Icon = item.icon
                return (
                    <div key={i} className=" group flex items-start gap-4 rounded-2xl bg-white p-5 transition-all duration-30
                                                hover:-translate-y-1 hover:shadow-lg">
                    {/* Icon */}
                    <div className=" flex h-14 w-14 items-center justify-center rounded-full bg-[#d6bf97] transition-all duration-300
                                        group-hover:scale-110 group-hover:bg-[#B58D47]/80">
                        <Icon className="h-7 w-7 text-[#2a5631]" />
                    </div>

                    {/* Text */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                </div>
                )
            })}
            </div>
        </div>
    </section>
    </>
    )
}
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, CreditCard, Truck, CheckCircle, XCircle } from "lucide-react"
import { OrderI } from "@/interfaces/orders"

export default function OrderCard({ order }: { order: OrderI }) {
  const date: string = new Date(order.createdAt).toLocaleDateString()

  return (
    <Card className="h-full w-4xl mx-auto rounded-2xl shadow-sm hover:shadow-md transition">
      
      {/* Header */}
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="text-lg">Order #{order._id.slice(-6)}</CardTitle>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar size={16} />
          {date}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CreditCard size={16} />
          {order.paymentMethodType}
        </div>

        {/* Status */}
        <div className="flex gap-2 mt-2">
          {order.isPaid ? (
            <Badge className="bg-green-500 flex gap-1 items-center">
              <CheckCircle size={14} /> Paid
            </Badge>
          ) : (
            <Badge variant="destructive" className="flex gap-1 items-center">
              <XCircle size={14} /> Unpaid
            </Badge>
          )}

          {order.isDelivered ? (
            <Badge className="bg-blue-500 flex gap-1 items-center">
              <Truck size={14} /> Delivered
            </Badge>
          ) : (
            <Badge variant="secondary">Processing</Badge>
          )}
        </div>
      </CardHeader>

      {/* Items */}
      <CardContent className="flex flex-col gap-3">
        {order.cartItems.map((item) => (
          <div key={item._id} className="flex items-center gap-3 border rounded-xl p-2">
            <Image
              src={item.product.imageCover}
              alt={item.product.title}
              width={60}
              height={60}
              className="rounded-lg object-cover aspect-square"
            />

            <div className="flex-1">
              <p className="font-medium text-sm line-clamp-1">{item.product.title}</p>
              <p className="text-xs text-muted-foreground">Qty: {item.count}</p>
            </div>

            <p className="font-semibold text-sm">{item.price} EGP</p>
          </div>
        ))}
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between items-center px-12 border-t pt-4">
        <p className="text-sm text-muted-foreground">
          Toatl Price
        </p>

        <p className="text-xl font-bold">
          {order.totalOrderPrice} EGP
        </p>
      </CardFooter>
    </Card>
  )
}
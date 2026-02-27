import { CartProductI } from "./cart"
import { ShippingAddressI } from "./shipping"
import { UserI } from "./user"

export interface OrderI {
  shippingAddress: ShippingAddressI
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: UserI
  cartItems: CartProductI[]
  createdAt: string
  updatedAt: string
  id: number
  __v: number
}
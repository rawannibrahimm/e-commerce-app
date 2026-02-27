import { ProductI } from "./products"

export interface WhishlistI {
    status: string
    count: number
    data: ProductI[]
}
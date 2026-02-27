"use server"
import { getUserToken } from "@/lib/auth"
import { CheckoutSchemaType } from "@/lib/validation/checkout.schema"

const API_URL = process.env.NEXT_PUBLIC_BASE_URL
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
export async function createCheckoutOnlineSession(cartId: string,formData: CheckoutSchemaType) {
    const token = await getUserToken()
    if(!token){
        return null
    }
    
    const response = await fetch(`${API_URL}/orders/checkout-session/${cartId}?url=${SITE_URL}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    }) 
    const data = await response.json()
    return data
}

export async function createCashOrder(cartId: string,formData: CheckoutSchemaType) {
    const token = await getUserToken()
    if(!token){
        return null
    }
    
    const response = await fetch(`${API_URL}/orders/${cartId}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    }) 
    const data = await response.json()
    return data
}
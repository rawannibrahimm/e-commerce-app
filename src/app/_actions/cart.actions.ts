"use server"

import { getUserToken } from "@/lib/auth"

// Here, even if we used the base url of the api direct 
// it won't be exposed (sth special about server actions/use server)
const API_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function addToCart(productId: string) {
    const token = await getUserToken()
    if(!token){
        throw new Error("You are not logged in. Please login to get access")
    }
    
    const response = await fetch(`${API_URL}/cart`, {
        method: "POST",
        body: JSON.stringify({productId: productId}),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    }) 
    const data = await response.json()
    return data
}

export async function getLoggedUserCart() {
    const token = await getUserToken()
    if(!token){
        return null
    }
    
    const response = await fetch(`${API_URL}/cart`, {
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    }) 
    const data = await response.json()
    return data
}

export async function removeSpecificCartItem(productId: string) {
    const token = await getUserToken()
    const response = await fetch(`${API_URL}/cart/${productId}`, {
        method: "DELETE",
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    }) 
    const data = await response.json()
    return data
}

export async function updateCartProductQuantity(productId: string, newCount: number) {
    const token = await getUserToken()
    const response = await fetch(`${API_URL}/cart/${productId}`, {
        method: "PUT",
        body: JSON.stringify({count: newCount}),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    }) 
    const data = await response.json()
    return data
}

export async function clearUserCart() {
    const token = await getUserToken()
    const response = await fetch(`${API_URL}/cart`, {
        method: "DELETE",
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    }) 
    const data = await response.json()
    return data
}
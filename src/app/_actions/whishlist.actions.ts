"use server"

import { getUserToken } from "@/lib/auth"

const API_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function addToWhishlist(productId: string) {
    const token = await getUserToken()
    if(!token){
        throw new Error("You are not logged in. Please login to get access")
    }
    
    const response = await fetch(`${API_URL}/wishlist`, {
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

export async function getLoggedUserWhishlist() {
    const token = await getUserToken()
    if(!token){
        return null
    }
    
    const response = await fetch(`${API_URL}/wishlist`, {
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    }) 
    const data = await response.json()
    return data
}

export async function removeProductFromWhishlist(productId: string) {
    const token = await getUserToken()
    const response = await fetch(`${API_URL}/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    }) 
    const data = await response.json()
    return data
}
import { decodedTokenI } from "@/interfaces/decodedToken"
import { getUserToken } from "@/lib/auth"
import { jwtDecode } from "jwt-decode"

const API_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function getUserOrders() {
    const token = await getUserToken()
    const decoded: decodedTokenI = await jwtDecode(token)
    const cartOwner = decoded.id
    const response = await fetch(`${API_URL}/orders/user/${cartOwner}`)
    const data = await response.json()
    // console.log(data)
    return data
}
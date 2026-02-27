"use server"

import { getUserToken } from "@/lib/auth"
import { ChangePasswordSchemaType, ProfileSchemaType } from "@/lib/validation/profile.schema"

// Here, even if we used the base url of the api direct 
// it won't be exposed (sth special about server actions/use server)
const API_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function updateLoggeduserpassword(formData: ChangePasswordSchemaType) {
    const token = await getUserToken()
    if(!token){
        return null
    }
    
    const response = await fetch(`${API_URL}/users/changeMyPassword`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    }) 
    const data = await response.json()
    return data
}

export async function updateLoggeduserData(formData: ProfileSchemaType) {
    const token = await getUserToken()
    if(!token){
        return null
    }
    
    const response = await fetch(`${API_URL}/users/updateMe`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    }) 
    const data = await response.json()
    return data
}
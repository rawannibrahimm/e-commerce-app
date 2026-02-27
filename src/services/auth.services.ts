import { logInSchemaType, registerSchemaType } from "@/lib/validation/auth.schema"

const API_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function signUpUser(formData: registerSchemaType) {
    const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    }) 
    const data = await response.json()
    return data
}

export async function signInUser(formData: logInSchemaType) {
    const response = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    }) 
    const data = await response.json()
    return data
}

// Function to get the token when we are not in a middleware or route handler
// we have the: next-auth.session-token
// and in production it will be __Secure-next-auth.session-token

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

// In order to use this fn later on we won't make a service for cart like we used to deal with apis before
// Instead we head to deal as server actions 
// This fn runs on the server only 
// so when a user hits a button to add to cart, the button is a client component 
// and here comes the server action that solves this problem 
// Client → Server Action → Backend API other than Client → Backend API

export async function getUserToken(){
    // This will return the session token value that next auth created
    // Reads cookie (server only) - Runs only on server, Browser JS cannot access this
    const encodedToken = (await cookies()).get("next-auth.session-token")?.value || (await cookies()).get("__Secure-next-auth.session-token")?.value
    // Verifies JWT , Decodes payload , Returns object
    const token = await decode({token: encodedToken, secret: process.env.NEXTAUTH_SECRET!})
    // console.log(token?.token)
    // Give me backend token securely on server
    // The token returns an object of things like sub, user object, token and so on , we want the token only right now
    return token?.token as string
    // Backend-for-Frontend (BFF) pattern
}
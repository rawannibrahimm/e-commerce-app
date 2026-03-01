// Options are passed to NextAuth.js when initializing it in an API route.
// Credentials provider
// The Credentials provider allows you to handle signing in with arbitrary credentials, 
// such as a username and password, two-factor authentication or hardware device
// It supports use cases where you have an existing system you need to authenticate users against.

import { signInUser } from "@/services/auth.services"
import {NextAuthOptions} from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode";
import { decodedTokenI } from "@/interfaces/decodedToken";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn:"/login",
    },
    providers: [
        Credentials({
            name:"Credentials",
            credentials: {
                email:{},
                password:{},
            },
            authorize: async (credentials) => {
                if (!credentials) return null
                const data = await signInUser(credentials)
                // console.log(data)
                if (data.message == "success") {
                    const decodedToken : decodedTokenI = jwtDecode(data.token)
                    return{
                        id    : decodedToken.id,
                        user  : data.user,
                        token : data.token,
                    }

                }else {
                    throw new Error(data.message || "Wrong Credentials")
                }
            },
        })
    ],
    callbacks: {
        jwt({token, user, session}){
            if (user){
                token.user = user.user
                token.token = user.token
            }
            // THIS handles profile updates
            if (session?.user) {
                token.user = session.user
            }
            return token
        },
        session({session, token}){
            if(session){
                session.user = token.user
                // we donot do the next commented line
                // session.backendToken = token.token
                // That means your backend token becomes accessible in client-side JavaScript.
                // The cookie is httpOnly → safe
                // he session object is accessible in JS → not httpOnly
                // So it exposes the token we worked hard to protect it as a senstive data.
            }
            return session
        }
    }
}
// importing our authOptions 
// Route Handlers give you a secure, server-only place to run authentication logic.
// If i tried: http://localhost:3000/api/auth/signin it will open the nextauth signin page

import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }


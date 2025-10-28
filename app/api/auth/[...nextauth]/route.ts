import NextAuth, { Session, Profile } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import UserModel from "@/models/user"
import { connectToDB } from "@/utils/database"
import dotenv from "dotenv";
dotenv.config();

const handler = NextAuth({
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
   ],
   session: {
      strategy: "jwt",
      maxAge: 24 * 60 * 60,
   },
   callbacks: {
      async session({ session }: { session: Session }) {
         if (!session?.user?.email) return session;
   
         const sessionUser = await UserModel.findOne({
            email: session.user.email
         })
         session.user.id = sessionUser._id.toString();
         return session;
      },
      async signIn({ profile }: { profile?: Profile }) {
         try {
            await connectToDB();
   
            if (!profile?.email || !profile?.name) return false;

            // check if a user already exists
            const userExists = await UserModel.findOne({
               email: profile?.email
            })
   
            // if not, create a new user
            if (!userExists) {
               await UserModel.create({
                  email: profile?.email,
                  username: profile?.name?.replace(/\s+/g, '').toLowerCase(),
                  image: profile?.picture
               })
            }
   
            return true;
         } catch (error) {
            console.log('Error during sign-in:', error);
            return false;
         }
      }
   },
   secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
import "next-auth"
import type { DefaultSession } from "next-auth"

declare module "next-auth" {
   interface Session {
      user: {
         id: string
         username?: string | null
      } & DefaultSession["user"]
   }

   interface Profile {
      email?: string
      name?: string
      picture?: string
      email_verified?: boolean
      sub?: string
   }
}
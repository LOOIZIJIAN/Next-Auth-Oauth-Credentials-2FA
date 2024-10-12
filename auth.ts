import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
import { UserRole } from "@prisma/client"
import { getAccountByUserId } from "./data/account"

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole
  isTwoFactorEnabled: boolean
  isOAuth: boolean
}
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ExtendedUser
      /** The user's postal address. */
      // name: string,
      // email: string,
      
      // image: string,
      // id: string,
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await getUserById(user.id as string);
      if(account?.provider !== "credentials") return true;
      if(!existingUser || !existingUser?.emailVerified) return false;
      if(existingUser.isTwoFactorEnabled){
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id) as any;
        if(!twoFactorConfirmation) return false;
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id 
          }
        });
        return true;
      }
      return true;
    },
    async jwt({token}) {    
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      const existingAccount = await getAccountByUserId(token.sub);
      if(!existingUser) return token;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.isOAuth = !!existingAccount
      token.email = existingUser.email;
      token.name = existingUser.name;
      return token
    },
    async session({session, token}) {
      if(token.sub && session.user){
        session.user.id = token.sub
      }
      if(token.role && session.user){
        session.user.role = token.role as UserRole
      }
      if(session.user){
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.isOAuth = token.isOAuth as boolean
      }
      return session
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})
import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID,
      clientSecret: process.env.AUTH_DISCORD_SECRET,
      authorization: {
        params: {
          scope: "identify email guilds.members.read",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.discordId = user.discordId
        token.role = user.role
      }

      if (account?.access_token && process.env.DISCORD_GUILD_ID) {
        try {
          const res = await fetch(
            `https://discord.com/api/v10/users/@me/guilds/${process.env.DISCORD_GUILD_ID}/member`,
            {
              headers: {
                Authorization: `Bearer ${account.access_token}`,
              },
            }
          )

          if (res.ok) {
            const member = await res.json()
            token.discordRoles = member.roles || []
          }
        } catch (error) {
          console.error("Error fetching Discord roles:", error)
        }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.discordId = token.discordId as string
        session.user.role = token.role as string
        ;(session.user as any).discordRoles = token.discordRoles || []
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})

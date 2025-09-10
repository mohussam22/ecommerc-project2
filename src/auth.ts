import { useRouter } from 'next/router';
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from 'next-auth/providers/github';


export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/auth/login'
    },


    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: {},
                password: {}

            },
            authorize: async (Credentials) => {
                const res = await fetch(`${process.env.API}/auth/signin`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: Credentials?.email,
                        password: Credentials?.password
                    }),

                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                const payload = await res.json()
                if (payload.message == 'success') {
                    const decode = JSON.parse(Buffer.from(payload.token.split('.')[1], 'base64').toString());
                    return {
                        id: decode.id,
                        user: payload.user,
                        token: payload.token
                    }
                }
                else {
                    throw new Error(payload.message || 'Something went wrong')
                }

            }
        }),
        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                if (account?.provider == 'github') {
                    token.user = {
                        name: user.name || '',
                        email: user.email || '',
                        image: user.image || '',
                        role: 'user',
                    }

                }
                else {
                    token.user = user.user
                    token.token = user.token
                }
            }
            return token
        },

        async session({ session, token }) {
            session.user = token.user
            return session
        }
    }
}
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'


export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {label: 'email', type: 'text'},
        password: {label: 'password', type: 'password'}
      },
      async authorize(credentials, req) {
        console.log(credentials, req)
        if(!credentials?.email || !credentials?.password) {
          throw new Error('유효하지 않는 값입니다.')
        }

        const user = {id:'kimmiran',name:'kimmiran',email:'shortyjjang8484@gmail.com'}
        if(!user) {
          throw new Error('유효하지 않는 값입니다')
        }
        return user
      }
    })
  ],
  // pages: {
  //   signIn: '/'
  // },
  // debug: process.env.NODE_ENV === 'development',
  // session: {
  //   strategy: 'jwt'
  // },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
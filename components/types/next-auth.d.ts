import NextAuth, {DefaultSession} from 'next-auth'
declare module 'next-auth' {
  interface Session {
    user: {
      email: string
      name: string
      password: string
      image:string
    } & DefaultSession['user']
  }
}
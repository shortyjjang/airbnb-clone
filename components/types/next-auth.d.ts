import NextAuth, {DefaultSession, ISODateString} from 'next-auth'
export type userType = {
  email: string
  name: string
  password: string
  image:string
}
export type LocationProps = {
  "value": string,
  "label": string,
  "flag": string,
  "lating": number[],
  "region": string
}
export type ListingProps = {
  id: string,
  category:string
  location: LocationProps
  guestCount: number
  roomCount: number
  bathroomCount: number
  imageSrc: string
  price: number
  title: string
  description:string
  locationValue: string
}

export type ReservationType = {
  totalPrice: number
  startDate: ISODateString
  endDate: ISODateString
}
declare module 'next-auth' {
  interface Session {
    user: userType & DefaultSession['user']
  }
}
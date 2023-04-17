
import ToasterProvider from "../providers/toasterprovider"
import RegisterModal from "./modals/register"
import Navbar from "./navbar"
import ClientOnly from "./clientonly"

import {Nunito} from 'next/font/google'
import LoginModal from "./modals/login"
import RentModal from "./modals/rent"

const font = Nunito({subsets : ['latin']})

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }){
  return (
    <div className={font.className}>
      <ClientOnly>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar />
      </ClientOnly>
      {children}
    </div>
  )
}

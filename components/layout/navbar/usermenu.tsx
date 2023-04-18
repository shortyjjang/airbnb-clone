'use client';

import { AiOutlineMenu, AiOutlineUser } from 'react-icons/ai'
import {useState} from 'react'
import MenuItem from './menuitem'
import useRegisterModal from '../../hooks/useRegisterModal'
import useLoginModal from '../../hooks/useLoginModal'
import { useSession, signOut } from 'next-auth/react'
import useRentModal from '../../hooks/useRentModal'

export default function UserMenu() {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { status } = useSession()
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap3">
        <button
          onClick={rentModal.onOpen}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
        >
          Airbnb your home
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor:pointer
            hover:shadow-md
            transition
          "
        >
          <AiOutlineMenu />
          <div className='
            rounded-full
            p-1
            text-slate-700
            bg-gray-200
            text-xl
            hidden
            md-block
            relative
          '
          ><AiOutlineUser /></div>
        </button>
      </div>
      {isOpen && (
        <div className='
          absolute
          rounded-xl
          shadow-md
          w-[40vw]
          md:w-3/4
          bg-white
          overflow-hidden
          right-0
          top-12
          text-sm
        '>
          {status === "authenticated" 
          ?<div className='
            flex
            flex-col
            cursor-pointer
          '>
            <MenuItem onClick={() => {}} label="My trips" />
            <MenuItem onClick={() => {}} label="My favorites" />
            <MenuItem onClick={() => {}} label="My reservations" />
            <MenuItem onClick={() => {}} label="My properties" />
            <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
            <hr />
            <MenuItem onClick={signOut} label="Logout" />
          </div>
          :<div className='
            flex
            flex-col
            cursor-pointer
          '>
            <MenuItem 
              onClick={loginModal.onOpen} 
            label="Sign in" />
            <MenuItem onClick={registerModal.onOpen} label="Register" />
          </div>}
        </div>
      )}
    </div>
  )
}

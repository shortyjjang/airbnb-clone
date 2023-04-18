'use client';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import useFavorite from "./hooks/useFavorite"
import { SafeUser } from "./types/next-auth"

interface HeartButtonProps {
  listingId: string
  currentUser: SafeUser | null
}

export default function HeartButton({currentUser, listingId}: HeartButtonProps) {
  const {hasFavorite, toggleFavorite} = useFavorite({listingId, currentUser})
  return (
    <div 
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
      <AiFillHeart size={24} className={(hasFavorite) ? `fill-rose-500` : `fill-neutral-500/70`} />
    </div>
  )
}

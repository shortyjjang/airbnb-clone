import { useSession } from "next-auth/react"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"

interface HeartButtonProps {
  listingId: string
}


export default function HeartButton({listingId}: HeartButtonProps) {
  const session= useSession()
  const hasFavorite = false
  const toggleFavorite = () => {

  }
  return (
    <div onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
      <AiFillHeart size={24} className={hasFavorite ? `fill-rose-500` : `fill-neutral-500/70`} />
    </div>
  )
}

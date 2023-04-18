import {useCallback, useMemo} from 'react'
import {toast} from 'react-hot-toast'
import useLoginModal from './useLoginModal'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { SafeUser } from '../types/next-auth'

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null
}

export default function useFavorite({ listingId, currentUser }: IUseFavorite) {
  const loginModal = useLoginModal()
  const router = useRouter()

  const hasFavorite = useMemo(() => {
    const list:string[] = currentUser?.favoritesIds || []

    return list.includes(listingId)
  },[listingId, currentUser?.favoritesIds])
  const toggleFavorite = useCallback(async(e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const is = await hasFavorite
    if(!currentUser) return loginModal.onOpen()
    try {
      let request = () =>  (is) ? axios.delete(`/api/favorite/${listingId}`) : axios.post(`/api/favorite/${listingId}`)
      await request()
      router.refresh()
      toast.success('Updated favorite')
      
    }catch(e) {
      toast.error('Failed Favorite')
    }
  },[hasFavorite, listingId, loginModal, router, currentUser])
  return {
    hasFavorite,
    toggleFavorite
  }
}

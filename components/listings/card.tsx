'use client';
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from 'react'
import useCountries from "../hooks/useCountries";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../heart";
import Button from "../button";
import { SafeListing, SafeReservation, SafeUser } from "../types/next-auth";

interface ListCardProps {
  data: SafeListing
  reservation?: SafeReservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string;
  actionId?:string
  currentUser: SafeUser | null
}
export default function ListingCard({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  reservation,
  currentUser
}:ListCardProps) {
  const router = useRouter()
  const { getByValue } = useCountries()
  const location = getByValue(data.locationValue)
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if(disabled) return;

    if(onAction) onAction(actionId)
  },[disabled, actionId, onAction])

  const price = useMemo(() => {
    if(reservation) {
      return reservation.totalPrice
    }
    return data.price

  },[data.price, reservation])

  const reservationDate = useMemo(() => {
    if(!reservation) return null
    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  },[reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)} 
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image src={data.imageSrc} alt="listing" fill className="object-cover scale-110 h-full w-full group-hover:scale-100 transition" />
          <div className="absolute top-3 right-3">
            <HeartButton currentUser={currentUser} listingId={data.id} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category }
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">${price}</div>
          {!reservationDate && <div className="font-light">night</div>}
          {onAction && actionLabel && <Button label={actionLabel} onClick={handleClick} disabled={disabled} small />}
        </div>
      </div>
    </div>
  )
}

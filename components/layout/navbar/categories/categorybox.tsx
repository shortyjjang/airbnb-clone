'use client';
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import qs from 'query-string'
import { IconType } from "react-icons/lib"

interface CategoryBoxProps {
  icon: IconType
  label: string
  selected?:boolean
}

export default function CategoryBox({
  icon: Icon,
  label,
  selected
}:CategoryBoxProps) {
  const router = useRouter()
  const paramns = useSearchParams()
  const handleClick = useCallback(() => {
    const currentQuery = paramns ? qs.parse(paramns.toString()) : {}
    const updateQuery: any = {
      ...currentQuery,
      category: label
    }
    if(paramns?.get('category') === label) {
      delete updateQuery.category
    }
    const url = qs.stringifyUrl({
      url: '/',
      query: updateQuery
    },{skipNull : true})

    router.push(url)
  },[label, paramns, router])
  return (
    <div 
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        tranistion
        cursor:pointer
        ${selected ?`
          border-b-neutral-800
          text-neutral-800
        `:`
          border-transparent
          text-neutral-500
        `}
      `}
      onClick={handleClick}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  )
}

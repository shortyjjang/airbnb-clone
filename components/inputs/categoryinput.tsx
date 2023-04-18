'use client';

import { IconType } from "react-icons/lib"

interface CategoryInputProps {
  icon: IconType
  label: string
  selected?: boolean
  onClick:(value:string) => void;
}

export default function CategoryInput({
  icon: Icon,
  label,
  selected,
  onClick
}:CategoryInputProps) {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer
        ${selected ? `border-black`: `border-neutral-200`}
      `}
    >
      <Icon size={16} />
      <div className="font-semilbold">{label}</div>
    </div>
  )
}

'use client';
interface ContainerProps {
    children: React.ReactNode
}
export default function Container({children}:ContainerProps) {
  return (
    <div className="
        max-w-[2450px]
        max-auto
        xl:px-20
        md:px-10
        sm:px-2
        px-4
    ">{children}</div>
  )
}

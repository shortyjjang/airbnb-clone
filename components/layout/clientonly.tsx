import {useState, useEffect} from 'react'

export default function ClientOnly(
    {children}:
    {children: React.ReactNode}
  ) {
  const [hasMounted, setHasMounted] = useState<boolean>(false)
  useEffect(() => {
    setHasMounted(true)
  },[])
  if(!hasMounted) {
    return <></>
  }
  return (
    <>{children}</>
  )
}

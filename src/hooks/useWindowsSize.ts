import { useEffect, useState } from 'react'
interface WindowSizeProps {
  width: number
  height: number
}
export function useWindowsSize(): WindowSizeProps {
  const isClient = typeof window === 'object'


  function getSize(): WindowSizeProps {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
    }
  }
  const [windowSize, setWindowSize] = useState<WindowSizeProps>(getSize)

  useEffect(() => {
    if (!isClient) return

    const handleResize = () => {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)

   return () => window.removeEventListener('resize', handleResize)

  }, [isClient])
  return windowSize
}

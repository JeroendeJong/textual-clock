import { useCallback, useEffect, useState } from "react"

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(() => document.fullscreenElement !== null)

  useEffect(() => {
    const updateFullscreenState = () => setIsFullscreen(document.fullscreenElement !== null)

    document.addEventListener('fullscreenchange', updateFullscreenState)
    return () => document.removeEventListener('fullscreenchange', updateFullscreenState)
  }, [])

  const enterFullscreen = useCallback(() => {
    void document.documentElement.requestFullscreen().catch(() => {
      // Fullscreen can be denied by browser or embedding permissions.
    })
  }, [])

  return { isFullscreen, enterFullscreen }
}

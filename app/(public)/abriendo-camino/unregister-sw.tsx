"use client"

import { useEffect } from "react"

export function UnregisterServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister()
          console.log("✅ Service Worker desregistrado:", registration.scope)
        }
      })
    }
  }, [])

  return null
}

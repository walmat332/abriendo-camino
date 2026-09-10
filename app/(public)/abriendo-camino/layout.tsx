import { UnregisterServiceWorker } from "./unregister-sw"

export default function AbriendoCaminoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UnregisterServiceWorker />
      {children}
    </>
  )
}

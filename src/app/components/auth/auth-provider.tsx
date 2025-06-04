// "use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
// import { verifyCSRF } from "@/lib/redux/slices/authSlice"
// import { supabase } from "@/lib/supabase/client"
// import { KenyanFlagLoader } from "@/components/ui/loading-spinner"
// import { useAuthSession, useSignOut } from "@/features/auth/auth-queries"
// import { getCSRFTokenFromCookie, isValidCSRFToken } from "@/lib/utils/csrf"

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const dispatch = useAppDispatch()
//   const router = useRouter()
//   const { isLoading: reduxLoading } = useAppSelector((state) => state.auth)
//   const { data: session, isLoading: queryLoading } = useAuthSession()
//   const { mutate: signOut } = useSignOut()

//   // Verify CSRF token on mount
//   useEffect(() => {
//     const token = getCSRFTokenFromCookie()
//     if (token) {
//       const isValid = isValidCSRFToken(token)
//       dispatch(verifyCSRF(isValid))
//     }
//   }, [dispatch])

//   // Handle auth state changes
//   useEffect(() => {
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         if (event === "SIGNED_OUT") {
//           signOut()
//           router.push("/auth/signin")
//         }
//       }
//     )

//     return () => subscription.unsubscribe()
//   }, [dispatch, router, signOut])

//   // Handle storage events for cross-tab sync
//   useEffect(() => {
//     const handleStorageEvent = (event: StorageEvent) => {
//       if (event.key === "supabase-auth-event") {
//         const { event: authEvent } = JSON.parse(event.newValue || "{}")
//         if (authEvent === "SIGNED_OUT") {
//           signOut()
//           router.push("/auth/signin")
//         }
//       }
//     }

//     window.addEventListener("storage", handleStorageEvent)
//     return () => window.removeEventListener("storage", handleStorageEvent)
//   }, [dispatch, router, signOut])

//   // Show loading state while initializing
//   if (reduxLoading || queryLoading) {
//     return <div><KenyanFlagLoader /></div>
//   }

//   return <>{children}</>
// }
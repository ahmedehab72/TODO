// components/ClientUserId.tsx
'use client'
import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function ClientUserId() {
    const { isLoaded, userId, isSignedIn } = useAuth()
    
    useEffect(() => {
        // Only run when Clerk has finished loading
        if (!isLoaded) return
        
        console.log('ClientUserId - isLoaded:', isLoaded, 'isSignedIn:', isSignedIn, 'userId:', userId)
        
        if (isSignedIn && userId) {
            // User is signed in - set the cookie
            document.cookie = `userId=${userId}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
            console.log('Cookie set for userId:', userId)
        } else {
            // User is signed out - delete the cookie
            document.cookie = 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
            console.log('Cookie deleted - user signed out')
        }
    }, [isLoaded, isSignedIn, userId])

    // This component doesn't render anything visible
    return null
}
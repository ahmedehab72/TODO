import {  SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { ModeToggle } from './ModeToggle'

export default function Navbar() {
  return (
    <header className='flex items-center justify-between p-24 py-6 '>
      <ModeToggle />
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  )
}
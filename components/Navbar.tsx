import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <div className="container">
      <nav className="flex items-center justify-between py-5 w-full lg:w-3/4 mx-auto">
        <ModeToggle />
        <UserButton />
      </nav>
    </div>
  );
};

export default Navbar;

// import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

// function Header() {
//   return (
//     <header style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>
//       <h1>My App</h1>
//       <SignedIn>
//         <UserButton />
//       </SignedIn>
//       <SignedOut>
//         <SignInButton />
//       </SignedOut>
//     </header>
//   )
// }
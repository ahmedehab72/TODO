"use client";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import ClientUserId from "./ClientUserId";

const Navbar = () => {
  const { isSignedIn } = useUser();
  return (
    <div className="container">
      <nav className="flex items-center justify-between py-5 w-full lg:w-3/4 mx-auto">
        <ModeToggle />
        <div>
          <SignedIn>
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/sign-in" />
            ) : (
              ''
            )}
          </SignedIn>

        </div>
      </nav>
      <ClientUserId />
    </div>
  );
};

export default Navbar;

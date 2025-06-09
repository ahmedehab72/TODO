"use client";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import ClientUserId from "./ClientUserId";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { isSignedIn } = useUser();
  return (
    <div >
      <nav className="flex items-center justify-between py-5 w-3/4 mx-auto">
       <div className="flex items-center space-x-4">
         <ModeToggle />
         <LanguageSwitcher />
       </div>
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

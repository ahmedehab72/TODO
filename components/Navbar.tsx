import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <div className="container">
      <nav className="flex items-center justify-between py-5 w-full lg:w-3/4 mx-auto">
        <ModeToggle />
      </nav>
    </div>
  );
};

export default Navbar;
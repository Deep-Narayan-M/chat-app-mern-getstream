import { Link } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, Sparkle } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import toast from "react-hot-toast";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();

  const handleLogout = () => {
    logoutMutation();
    toast.success("Logged out successfully");
    // Force redirect to login page
    window.location.href = "/login";
  };

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      {/* LOGO - ONLY IN THE HOME PAGE */}
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <Sparkle className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
            XenoChat
          </span>
        </Link>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="size-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          <ThemeSelector />

          <Link to="/profile">
            <button className="btn btn-ghost btn-circle avatar">
              <div className="size-9 rounded-full">
                <img
                  src={authUser?.profilePic}
                  alt="User Avatar"
                  className="rounded-full"
                />
              </div>
            </button>
          </Link>

          {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={handleLogout}>
            <LogOutIcon className="size-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

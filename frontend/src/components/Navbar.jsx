import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { LogOut, Menu, Search } from "lucide-react";
import { useContentStore } from "../store/content";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { setContentType } = useContentStore();

  return (
    <header className=" max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 2xl:max-w-[90vw] 2xl:p-10 4k:max-w-[90vw] 4k:p-16">
      <div className=" flex items-center gap-10 z-50 2xl:gap-20 4k:gap-96">
        <Link to={"/"}>
          <img
            src="/netflix-logo.png"
            alt="Netflix-logo"
            className=" w-32 sm:w-40 2xl:w-56 4k:w-96"
          />
        </Link>
        {/* Navbar for desktop */}
        <div className="hidden sm:flex gap-2 items-center 2xl:text-3xl 2xl:gap-10 4k:text-6xl 4k:gap-32">
          <Link
            to={"/"}
            className="hover:underline"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="hover:underline"
            onClick={() => setContentType("tv")}
          >
            Tv Shows
          </Link>
          <Link to={"/history"} className="hover:underline">
            Search History
          </Link>
        </div>
      </div>
      {/* Navbar RHS */}
      <div className=" flex gap-2 z-50 items-center 2xl:gap-10 4k:gap-20">
        <Link to={"/search"}>
          <Search className=" cursor-pointer size-6 2xl:size-10 4k:size-20" />
        </Link>
        <img
          src={user.image}
          alt="Avatar"
          className=" h-8 rounded cursor-pointer 2xl:h-10 4k:h-20"
        />
        <LogOut
          className="size-6 cursor-pointer 2xl:size-10 4k:size-20"
          onClick={logout}
        />
      </div>

      <div className=" sm:hidden">
        <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
      </div>
      {/* Navbar for Mobile */}
      {isMobileMenuOpen && (
        <div className=" w-full sm:hidden mt-4 z-50 bg-black border ronded border-gray-800">
          <Link
            to={"/"}
            className=" block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className=" block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Tv Shows
          </Link>
          <Link
            to={"/history"}
            className=" block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;

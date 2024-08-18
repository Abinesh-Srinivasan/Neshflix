import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  return (
    <div className=" hero-bg relative">
      {/* Navbar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10 2xl:pt-8 4k:pt-20 2xl:max-w-screen-2xl 4k:max-w-screen-4k 4k:px-80">
        <img
          src="/netflix-logo.png"
          alt="netflix logo"
          className="w-40 md:w-52 2xl:w-64 4k:w-96"
        />
        <Link to={"/login"} className="text-white bg-red-600 py-1 px-2 rounded 2xl:text-3xl 2xl:px-4 2xl:py-2 4k:text-6xl 4k:px-8 4k:py-6">
          Sign In
        </Link>
      </header>
      {/* hero section */}
      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto 2xl:max-w-7xl 4k:max-w-screen-4k">
        <h1 className=" text-4xl md:text-6xl font-bold mb-4 2xl:mb-6 4k:mb-16 4k:text-9xl">
          Unlimited Movies, TV shows and more
        </h1>
        <p className="text-lg mb-4 2xl:text-2xl 2xl:mb-6 4k:mb-16 4k:text-7xl">Watch anywhere. Cancel anytime.</p>
        <p className="mb-4 2xl:mb-6 2xl:text-2xl 4k:mb-16 4k:text-6xl">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {/* form */}
        <form className="flex flex-col md:flex-row gap-4 w-1/2 4k:gap-8">
          <input
            type="email"
            className=" p-2 rounded flex-1 bg-black/80 border border-gray-700 2xl:text-3xl 2xl:p-4 4k:text-6xl 4k:p-6"
            placeholder="Email address"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center 4k:text-5xl">
            Get Started
            <ChevronRight className="size-8 md:size-10" />
          </button>
        </form>
      </div>
      {/* separator */}
      <div className="h-2 w-full bg-[#232323] aria-hidden:true" />
      {/* section-1 */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2 4k:max-w-7xl">
          {/* LHS */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 4k:text-7xl">
              Enjoy on your TV
            </h2>
            <p className="text-lg md:text-xl 4k:text-4xl">
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </p>
          </div>
          {/* RHS */}
          <div className="flex-1 relative">
            <img src="/tv.png" alt="Tv image" className="mt-4 z-20 relative" />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      {/* separator */}
      <div className="h-2 w-full bg-[#232323] aria-hidden:true" />
      {/* section-2 */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2 4k:max-w-7xl">
          {/* left side */}
          <div className="flex-1 relative">
            <div className="relative">
              <img
                src="/stranger-things-lg.png"
                alt="Stranger Things img"
                className="mt-4"
              />

              <div
                className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black
              w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2
              "
              >
                <img
                  src="/kurup.jpg"
                  alt="image"
                  className="h-full"
                />
                <div className=" flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">
                      Kurup
                    </span>
                    <span className="text-sm text-blue-500">
                      Downloading...
                    </span>
                  </div>

                  <img src="/download-icon.gif" alt="" className="h-12" />
                </div>
              </div>
            </div>
          </div>
          {/* right side */}

          <div className="flex-1 md:text-left text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance 4k:text-7xl">
              Download your shows to watch offline
            </h2>
            <p className="text-lg md:text-xl 4k:text-4xl">
              Save your favorites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>
      {/* separator */}
      <div className="h-2 w-full bg-[#232323] aria-hidden:true" />
      {/* section-3 */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2 4k:max-w-7xl">
          {/* LHS */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 4k:text-7xl">
              Watch everywhere
            </h2>
            <p className="text-lg md:text-xl 4k:text-4xl">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and Tv.
            </p>
          </div>
          {/* RHS */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="/device-pile.png"
              alt="Tv image"
              className="mt-4 z-20 relative"
            />
            <video
              className="absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-10 max-w-[63%]"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      {/* separator */}
      <div className="h-2 w-full bg-[#232323] aria-hidden:true" />
      {/* section-4 */}
      <div className="py-10 bg-black text-white">
        <div
          className="flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row
           px-4 md:px-2 4k:max-w-7xl
        "
        >
          {/* left */}
          <div className="flex-1 relative">
            <img src="/kids.png" alt="Enjoy on your TV" className="mt-4" />
          </div>
          {/* right */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 4k:text-7xl">
              Create profiles for kids
            </h2>
            <p className="text-lg md:text-xl 4k:text-4xl">
              Send kids on adventures with their favorite characters in a space
              made just for them—free with your membership.
            </p>
          </div>
        </div>
      </div>
      {/* footer */}
    </div>
  );
};

export default AuthScreen;

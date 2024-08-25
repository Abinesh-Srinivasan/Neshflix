import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoggingIn } = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 2xl:pt-8 2xl:max-w-screen-2xl 4k:max-w-screen-4k 4k:px-80 4k:pt-20">
        <Link to={"/"}>
          <img
            src="/netflix-logo.png"
            alt="netflix logo"
            className="w-40 md:w-52 2xl:w-64 4k:w-96"
          />
        </Link>
      </header>

      <div className=" flex justify-center items-center mt-20 mx-3 md:mt-28 lg:mt-0 2xl:mt-32 4k:mt-80">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md 2xl:max-w-3xl 2xl:space-y-8 2xl:p-10 4k:max-w-7xl 4k:p-16 4k:space-y-14 2xl:rounded-xl 4k:rounded-3xl">
          <h1 className=" text-center text-white text-2xl font-bold mb-4 md:text-3xl lg:text-2xl 2xl:text-5xl 4k:text-8xl">
            Login
          </h1>
          {/* form */}
          <form
            className="space-y-4 md:space-y-8 lg:space-y-4 2xl:space-y-10 4k:space-y-14"
            onSubmit={handleLogin}
          >
            {/* email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block md:text-xl lg:text-sm 2xl:text-3xl 4k:text-7xl"
              >
                Email
              </label>
              <input
                type="email"
                className=" w-full py-2 px-3 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring 2xl:text-2xl 2xl:mt-3 4k:mt-8 4k:text-6xl"
                placeholder="abineshDq1328@example.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block md:text-xl lg:text-sm 2xl:text-3xl 4k:text-7xl"
              >
                Password
              </label>
              <input
                type="password"
                className=" w-full py-2 px-3 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring 2xl:text-2xl 2xl:mt-3 4k:mt-8 4k:text-6xl"
                placeholder="**********"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* login button*/}
            <button
              className=" w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 2xl:text-3xl 2xl:rounded-lg 2xl:py-4 4k:rounded-2xl 4k:py-8 4k:text-6xl"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Loading..." : "Login"}
            </button>
          </form>
          <div className=" text-center text-gray-400 2xl:text-3xl 4k:text-6xl">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-red-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

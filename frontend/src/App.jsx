import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage";

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore(); // destructuring the global variables from authUser
  console.log("Auth User:", user);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  // loading animation
  if (isCheckingAuth) {
    return (
      <div className=" h-screen">
        <div className=" flex items-center justify-center h-full bg-black">
          <Loader className=" animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;

import { useAuthStore } from "../../store/authUser";

const HomeScreen = () => {
  const { logout } = useAuthStore();
  return (
    <div>
      <h1>HomeScreen</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomeScreen;

import { logout } from "../features/authSlice";
import { persistor } from "../app/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Logout = ({ className }: { className: string }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge(); // clear persisted state
    navigate("/");
  };

  return (
    <Button
      className={`cursor-pointer text-red ${className} `}
      variant="ghost"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default Logout;

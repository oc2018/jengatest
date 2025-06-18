import { logout } from "../features/authSlice";
import { persistor } from "../app/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge(); // clear persisted state
    navigate("/");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

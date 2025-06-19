import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { useGetTokenMutation } from "./services/getJengaTokenApi";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import { useEffect } from "react";

const merchantCode = import.meta.env.VITE_JENGA_MERCHANT_CODE;
const consumerSecret = import.meta.env.VITE_JENGA_CUSTOMER_SECRET;

function App() {
  const [getToken] = useGetTokenMutation();
  const token = useSelector(
    (state: RootState) => state.user.user.jengaToken.token
  );

  const formData = new FormData();
  formData.append("merchantCode", merchantCode);
  formData.append("consumerSecret", consumerSecret);

  useEffect(() => {
    if (!token) getToken(formData);
  }, [token]);

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;

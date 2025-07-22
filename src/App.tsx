import "./global.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Transactions from "./pages/Transactions";
import Bank from "./pages/Bank";
import Properties from "./pages/Properties";
import Tenants from "./pages/Tenants";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="flex min-h-screen  w-full ">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/bank" element={<Bank />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;

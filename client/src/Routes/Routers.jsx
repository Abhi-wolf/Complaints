import Home from "@/pages/Home";
import { Routes, Route } from "react-router-dom";
import SignUp from "@/pages/Authentication/SignUp";
import LoginUser from "@/pages/Authentication/LoginUser";
import LoginAdmin from "@/pages/Authentication/LoginAdmin";
import ProtectedRoute from "./ProtectedRoutes";
import UserDashboard from "@/pages/Dashboard/UserDashboard";
import AdminDashBoard from "@/pages/Dashboard/AdminDashBoard";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login-user" element={<LoginUser />} />
      <Route path="/login-admin" element={<LoginAdmin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/profile/me"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashBoard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Routers;

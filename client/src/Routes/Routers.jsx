import Home from "@/pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "@/pages/Authentication/SignUp";
import LoginUser from "@/pages/Authentication/LoginUser";
import LoginAdmin from "@/pages/Authentication/LoginAdmin";
import ProtectedRoute from "./ProtectedRoutes";
import UserDashboard from "@/pages/Dashboard/UserDashboard";
import AdminDashBoard from "@/pages/Dashboard/AdminDashBoard";
import UserSettings from "@/pages/Settings/UserSettings";
import Complain from "@/pages/Complain/Complain";
import AdminSettings from "@/pages/Settings/AdminSettings";
import { useAuth } from "@/context/UserContext";
import { useEffect } from "react";
import AllUsersDashboard from "@/pages/Dashboard/AllUsersDashboard";

function Routers() {
  const { userName } = useAuth();

  useEffect(() => {
    if (!userName === "") {
      <Navigate to="/login-user" replace="true" />;
    }
  }, [userName]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login-user" element={<LoginUser />} />
      <Route path="/login-admin" element={<LoginAdmin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/user/dashboard/:id"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/profile/:id"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserSettings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashBoard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/profile/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminSettings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/alluserdetails"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AllUsersDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/complain/:complaintId"
        element={
          <ProtectedRoute allowedRoles={["admin", "user"]}>
            <Complain />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Routers;

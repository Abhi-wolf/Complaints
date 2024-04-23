import { useAuth } from "@/context/UserContext";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (!cookies.token) navigate("/login-user", { replace: true });
  }, [cookies]);

  const { role } = useAuth();
  const isAllowed = allowedRoles.includes(role);
  // console.log(isAllowed);
  console.log(role);

  const accessibleRoute = isAllowed
    ? children
    : navigate("/login-user", { replace: true });
  return accessibleRoute;
};

export default ProtectedRoute;

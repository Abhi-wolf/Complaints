import { useAuth } from "@/context/UserContext";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  if (!cookies.token) navigate("/login-user");
  console.log(cookies);

  const { user } = useAuth();
  const isAllowed = allowedRoles.includes(user.role);

  const accessibleRoute = isAllowed ? children : navigate("/login-user");
  return accessibleRoute;
};

export default ProtectedRoute;

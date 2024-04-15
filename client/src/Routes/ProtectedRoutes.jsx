import { useAuth } from "@/context/UserContext";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  if (!cookies.token) navigate("/login-user");

  const { role } = useAuth();
  const isAllowed = allowedRoles.includes(role);
  // console.log(isAllowed);
  // console.log(role);

  const accessibleRoute = isAllowed ? children : navigate("/login-user");
  return accessibleRoute;
};

export default ProtectedRoute;

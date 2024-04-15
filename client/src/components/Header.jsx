import { Link, useNavigate } from "react-router-dom";

import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/UserContext";
import { toast } from "sonner";
import { UserModeToggle } from "./UserModeTogle";

function Header() {
  const { theme } = useTheme();
  const { user, setUserDetail } = useAuth();
  const navigate = useNavigate();

  function Logout() {
    setUserDetail({});
    navigate("/login-user");
    toast.success("Logged Out Successfully");
  }

  return (
    <div
      className={`min-w-full h-[80px] sm:px-4 md:px-8 flex items-center justify-between ${
        theme === "light" ? "bg-slate-100" : "bg-slate-300"
      }`}
    >
      <Logo />
      <div className="flex items-center gap-1 md:gap-4">
        {user.name ? (
          <Button onClick={Logout}>Logout</Button>
        ) : (
          <UserModeToggle />
        )}
        <Link to="/signup">
          <Button>Sign Up</Button>
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
}

export default Header;

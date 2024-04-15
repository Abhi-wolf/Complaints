import { Link } from "react-router-dom";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/UserContext";
import { UserModeToggle } from "./UserModeTogle";
import { ProfileToggle } from "./ProfileToggle";

function Header() {
  const { theme } = useTheme();
  const { userName } = useAuth();

  return (
    <div
      className={`min-w-full h-[80px] px-4 md:px-8 flex items-center justify-between ${
        theme === "light" ? "bg-slate-100" : "bg-slate-300"
      }`}
    >
      <Logo />
      <div className="flex items-center gap-1 md:gap-4">
        {userName ? <ProfileToggle /> : <UserModeToggle />}
        {!userName && (
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}

export default Header;

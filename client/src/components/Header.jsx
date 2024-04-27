import { Link } from "react-router-dom";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { useAuth } from "@/context/UserContext";
import { UserModeToggle } from "./UserModeTogle";
import { ProfileToggle } from "./ProfileToggle";

function Header() {
  const { userName, role, userId } = useAuth();

  return (
    <div className="min-w-full h-[80px] px-4 md:px-8 flex items-center justify-between shadow-xl shadow-indigo-500/50">
      <Logo />
      <div className="flex items-center gap-1 md:gap-4">
        <Link
          to={`/${role}/dashboard/${userId}`}
          className="text-emerald-500 underline underline-offset-4 text-sm md:text-xl"
        >
          {userName ? userName : ""}
        </Link>

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

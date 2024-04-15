import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export function UserModeToggle() {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Login</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate("/login-admin")}>
          Login as an Admin
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/login-user")}>
          Login as a User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

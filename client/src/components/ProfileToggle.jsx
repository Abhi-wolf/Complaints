import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/UserContext";
import { PersonIcon } from "@radix-ui/react-icons";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function ProfileToggle() {
  const [cookies, setCookie] = useCookies(["token"]);

  const { setUserDetail, userId } = useAuth();
  const navigate = useNavigate();
  console.log("id = ", userId);

  function Logout() {
    setUserDetail({});
    setCookie("token", null, { path: "/" });
    navigate("/login-user");
    toast.success("Logged Out Successfully");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <PersonIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate(`/user/profile/${userId}`)}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={Logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { getAllUsers } from "@/services/apiAuth";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export function useGetAllUsers() {
  const [cookies] = useCookies(["token"]);

  const {
    data: users,
    isPending,
    error,
  } = useQuery({
    queryFn: () => getAllUsers(cookies.token),
    queryKey: ["users"],
  });

  return { users, isPending, error };
}

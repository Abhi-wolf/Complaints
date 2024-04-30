import { getUserDetails } from "@/services/apiAuth";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

export function useGetUser() {
  const [cookies] = useCookies(["token"]);
  const { id } = useParams();

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryFn: () => getUserDetails(id, cookies.token),
    queryKey: ["user", id],
  });

  return { user, isPending, error };
}

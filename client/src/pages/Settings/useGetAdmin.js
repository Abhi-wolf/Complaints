import { getAdminDetails } from "@/services/apiAuth";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

export function useGetAdmin() {
  const [cookies] = useCookies(["token"]);
  const { id } = useParams();

  const {
    data: admin,
    isPending,
    error,
  } = useQuery({
    queryFn: () => getAdminDetails(id, cookies.token),
    queryKey: ["user", id],
  });

  return { admin, isPending, error };
}

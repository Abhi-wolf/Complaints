import { getAllComplaintsAdmin } from "@/services/apiComplaints";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export function useGetAllComplaintsAdmin() {
  const [cookies] = useCookies(["token"]);

  const {
    data: allComplaints,
    isPending,
    error,
  } = useQuery({
    queryFn: () => getAllComplaintsAdmin(cookies.token),
    queryKey: ["allComplaints"],
  });
  return { allComplaints, error, isPending };
}

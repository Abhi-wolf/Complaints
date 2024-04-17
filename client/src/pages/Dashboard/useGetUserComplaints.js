import { getAllComplaint } from "@/services/apiComplaints";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export function useGetUserComplaints() {
  const [cookies] = useCookies(["token"]);

  const {
    data: complaints,
    isPending,
    error,
  } = useQuery({
    queryFn: () => getAllComplaint(cookies.token),
    queryKey: ["complaints"],
  });
  return { complaints, error, isPending };
}

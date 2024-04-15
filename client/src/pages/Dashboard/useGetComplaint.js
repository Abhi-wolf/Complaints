import { getAllComplaint } from "@/services/apiComplaints";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export function useGetAllComplaints() {
  const [cookies] = useCookies(["token"]);

  const {
    data: complaints,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAllComplaint(cookies.token),
    queryKey: ["complaints"],
  });
  return { complaints, error, isLoading };
}

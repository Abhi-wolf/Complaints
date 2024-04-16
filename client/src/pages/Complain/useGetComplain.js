import { getComplaint } from "@/services/apiComplaints";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

export function useGetComplaint() {
  const [cookies] = useCookies(["token"]);
  const { complaintId } = useParams();

  const {
    data: complaint,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["complaint", complaintId],
    queryFn: () => getComplaint(complaintId, cookies.token),
  });
  return { complaint, error, isLoading };
}

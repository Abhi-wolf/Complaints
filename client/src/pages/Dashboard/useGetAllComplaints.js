import { getAllComplaintsAdmin } from "@/services/apiComplaints";
import { useQuery } from "@tanstack/react-query";

export function useGetAllComplaints() {
  const {
    data: allComplaints,
    isLoading,
    error,
  } = useQuery({
    queryFn: getAllComplaintsAdmin,
    queryKey: ["allComplaints"],
  });
  return { allComplaints, error, isLoading };
}

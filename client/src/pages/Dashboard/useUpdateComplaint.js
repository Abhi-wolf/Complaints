import { updateComplaint as updateComplaintApi } from "@/services/apiComplaints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

export function useUpdateComplaint() {
  const [cookies] = useCookies(["token"]);
  const queryClient = useQueryClient();
  const { complaintId } = useParams();

  const {
    mutate: updateComplaint,
    isPending,
    error: updationError,
  } = useMutation({
    mutationFn: (data) => updateComplaintApi(data, cookies.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaint", complaintId] });
    },
  });

  return { updateComplaint, isPending, updationError };
}

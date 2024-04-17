import { updateStatusOfComplaint } from "@/services/apiComplaints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export function useUpdateStatus() {
  const [cookies] = useCookies(["token"]);
  const queryClient = useQueryClient();

  const {
    mutate: updateStatus,
    isPending,
    error: updationError,
  } = useMutation({
    mutationFn: (data) => updateStatusOfComplaint(data, cookies.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
      queryClient.invalidateQueries({ queryKey: ["complaint"] });
    },
  });

  return { updateStatus, isPending, updationError };
}

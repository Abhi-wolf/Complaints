import { deleteComplaint as deleteComplaintApi } from "@/services/apiComplaints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export function useDeleteComplaint() {
  const [cookies] = useCookies(["token"]);
  const queryClient = useQueryClient();

  const {
    mutate: deleteComplaint,
    isPending,
    error: deletionError,
  } = useMutation({
    mutationFn: (data) => deleteComplaintApi(data, cookies.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
      queryClient.invalidateQueries({ queryKey: ["complaint"] });
    },
  });

  return { deleteComplaint, isPending, deletionError };
}

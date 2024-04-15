import { registerComplaint } from "@/services/apiComplaints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export function useRegisterComplaint() {
  const [cookies] = useCookies(["token"]);
  const queryClient = useQueryClient();

  const {
    mutate: registerNewComplaint,
    isPending,
    error: registerError,
  } = useMutation({
    mutationFn: (data) => registerComplaint(data, cookies.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
    },
  });

  return { registerNewComplaint, isPending, registerError };
}

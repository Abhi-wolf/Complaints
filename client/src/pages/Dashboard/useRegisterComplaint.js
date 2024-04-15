import { registerComplaint } from "@/services/apiComplaints";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export function useRegisterComplaint() {
  const [cookies] = useCookies(["token"]);

  const {
    mutate: registerNewComplaint,
    isLoading: isRegistering,
    error: registerError,
  } = useMutation({
    mutationFn: (data) => registerComplaint(data, cookies.token),
  });

  return { registerNewComplaint, isRegistering, registerError };
}

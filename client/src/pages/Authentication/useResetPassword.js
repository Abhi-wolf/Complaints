import { resetPassword as resetPasswordApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";

export function useResetPassword() {
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordApi,
  });
  return { resetPassword, isPending };
}

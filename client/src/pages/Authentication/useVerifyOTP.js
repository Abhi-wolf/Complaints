import { verifyOTP as verifyOTPApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";

export function useVerifyOTP() {
  const { mutate: verifyOTP, isPending } = useMutation({
    mutationFn: verifyOTPApi,
  });
  return { verifyOTP, isPending };
}

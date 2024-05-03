import { sendOTP as sendOTPApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";

export function useSendOTP() {
  const { mutate: sendOTP, isPending } = useMutation({
    mutationFn: sendOTPApi,
  });
  return { sendOTP, isPending };
}

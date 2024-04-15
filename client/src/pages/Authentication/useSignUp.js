import { signup as signupApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signupApi,
  });

  return { signUp, isLoading };
}

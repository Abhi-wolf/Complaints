import { login as loginApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
  });

  return { login, isLoading };
}

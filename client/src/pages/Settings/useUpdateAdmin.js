import { updateAdmin as updateAdminApi } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export function useUpdateAdmin() {
  const [cookies] = useCookies(["token"]);
  const queryClient = useQueryClient();

  const {
    mutate: updateAdmin,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: (data) => updateAdminApi(data, cookies.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { updateAdmin, isUpdating, error };
}

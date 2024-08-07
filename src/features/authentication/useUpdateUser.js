import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: () => {
            toast.success("User account successfully updated");
            //queryClient.setQueryData("user", user); // update cache
            queryClient.invalidateQueries({ queryKey: ["user"] }); // invalidate cache
        },
        onError: (err) => toast.error(err.message),
    });

    return { updateUser, isUpdating };
};

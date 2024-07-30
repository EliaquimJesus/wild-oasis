import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useCheckout = () => {
    const queryClient = useQueryClient();

    const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                status: "checked-out",
                isPaid: true,
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfuly checked out`);
            queryClient.invalidateQueries({ active: true });
        },
        onError: () => toast.error("There was an error while checkout"),
    });

    return { checkout, isCheckingOut };
};

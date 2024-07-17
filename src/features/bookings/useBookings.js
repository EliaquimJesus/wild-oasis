import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
//import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const [searchParams] = useSearchParams();
    //const queryClient = useQueryClient();

    // 1) FILTER
    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };

    // 2) SORT
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction };

    // PAGINATION
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    // QUERY
    const {
        isPending,
        data: bookings,
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    // // PRÉ-FETCHING
    // const pageCount = Math.ceil(bookings.count / PAGE_SIZE);

    // if (page < pageCount) {
    //     queryClient.prefetchQuery({
    //         queryKey: ["bookings", filter, sortBy, page + 1],
    //         queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    //     });
    // }

    // if (page > 1) {
    //     queryClient.prefetchQuery({
    //         queryKey: ["bookings", filter, sortBy, page - 1],
    //         queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    //     });
    // }

    // console.log(bookings.count);

    return { isPending, bookings, error };
}

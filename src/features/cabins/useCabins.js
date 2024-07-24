import { useQuery } from "@tanstack/react-query";
import { getCabines } from "../../services/apiCabins";

export function useCabins() {
    const {
        isPending,
        data: cabins,
        //error,
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabines,
    });
    return { isPending, cabins };
}

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
    const { isPending, cabins } = useCabins();
    const [searchParams] = useSearchParams();

    if (isPending) return <Spinner />;

    // 1) FILTER
    const filterValue = searchParams.get("discount") || "all";

    let filteredCabins;
    switch (filterValue) {
        case "all":
            filteredCabins = cabins;
            break;
        case "no-discount":
            filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
            break;
        case "with-discount":
            filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
            break;
        default:
            throw new Error("No filtered value found.");
    }

    // 2) SORT
    const sortBy = searchParams.get("sortBy") || "startDate-asc";
    const [field, direction] = sortBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;
    const sortedCabins = filteredCabins.sort(
        (a, b) => (a[field] - b[field]) * modifier
    );

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Cabine</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    //data={filteredCabins}
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;

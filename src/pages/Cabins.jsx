import { useEffect } from "react";
import { getCabines } from "../services/apiCabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
    useEffect(function () {
        getCabines().then((data) => console.log(data));
    }, []);
    return (
        <Row type="horizontal">
            <Heading as="h1">All cabins</Heading>
            <p>TEST</p>
            <img
                src="https://jljndeqsnnuqvmltvcqm.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"
                alt="cabin"
            />
        </Row>
    );
}

export default Cabins;

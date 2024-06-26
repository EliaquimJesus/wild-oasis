import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.main`
    padding: 20px;
`;

function App() {
    return (
        <>
            <GlobalStyles />
            <StyledApp>
                <row>
                    <Row type="horizontal">
                        <Heading as="h1">The Wild Oasis</Heading>
                        <div>
                            <Heading as="h2">Check in and Out</Heading>
                            <Button onClick={() => alert("Check in")}>
                                Check in
                            </Button>
                            <Button variations="secondary">Check out</Button>
                        </div>
                    </Row>
                    <Row>
                        <Heading as="h3">Form</Heading>
                        <form>
                            <Input type="number" placeholder="Check in info." />
                            <Input
                                type="number"
                                placeholder="Check out info."
                            />
                        </form>
                    </Row>
                </row>
            </StyledApp>
        </>
    );
}

export default App;

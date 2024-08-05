import Heading from "../ui/Heading";
import SignupFrom from "../features/authentication/SignupForm";

function NewUsers() {
    return (
        <>
            <Heading as="h1">Create a new user</Heading>
            <SignupFrom />
        </>
    );
}

export default NewUsers;

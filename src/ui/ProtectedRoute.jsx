import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    // 1. Load the authenticated user.
    const { isPending, user, isAuthenticated } = useUser();

    // 2. if there is no authenticated user redirect to login page
    useEffect(() => {
        if (!isAuthenticated && !isPending) navigate("/login");
    }, [isAuthenticated, isPending, navigate]);

    console.log(user);

    // 3. While loading show spinner
    if (isPending)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    // 4. if there is a user render App
    if (isAuthenticated) return children;
}

export default ProtectedRoute;

import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";

function LoginForm() {
    const [email, setEmail] = useState("nhekass@example.com");
    const [password, setPassword] = useState("pass0987");
    const { login, isPending } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) return;

        login(
            { email, password },
            {
                onSettled: () => {
                    setEmail(""), setPassword("");
                },
            }
        );
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isPending}
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isPending}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button size="large">
                    {isPending ? <SpinnerMini /> : "Login"}
                </Button>
            </FormRowVertical>
        </Form>
    );
}

export default LoginForm;

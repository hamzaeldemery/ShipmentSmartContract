import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

const SigninComponent = ({ setAuth }) => {
    const navigate = useNavigate();
    const [invalid, setInvalid] = useState(false);
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (
            localStorage.getItem(e.target[0].value)?.split("&")[0] !=
            e.target[1].value
        ) {
            setInvalid(true);
        } else {
            document.cookie = "username=" + e.target[0].value;
            localStorage.setItem(
                "userRole",
                localStorage.getItem(e.target[0].value)?.split("&")[1]
            );
            setAuth(true);
            navigate("/dashboard", { replace: true });
        }
    };

    return (
        <Container className="mt-5">
            <h1 className="fw-bold display-1 my-4">LOGIN</h1>
            {invalid && <Alert variant="danger">Invalid credentials</Alert>}
            <Form onSubmit={handleOnSubmit}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="Enter address" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                    />
                </Form.Group>
                <div className="text-center my-5 mx-auto">
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export const Signin = SigninComponent;
export default Signin;

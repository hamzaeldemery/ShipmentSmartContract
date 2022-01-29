import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { setUser } from "../../helpers";

const SignupComponent = ({ accounts }) => {
    const navigate = useNavigate();
    const [invalid, setInvalid] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState("Invalid Address");
    const handleOnClick = (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        if (
            accounts.includes(username) &&
            !localStorage.getItem(username) &&
            e.target[1].value.length
        ) {
            localStorage.setItem(
                username,
                e.target[1].value + "&" + e.target[2].value
            );
            setUser(username, e.target[2].value);
            navigate("/login");
        } else if (localStorage.getItem(username)) {
            setInvalid(true);
            setInvalidMessage("Address already exists");
        } else if (!accounts.includes(username)) {
            setInvalid(true);
            setInvalidMessage("Invalid Address");
        } else if (!e.target[1].value.length) {
            setInvalid(true);
            setInvalidMessage("Enter a password");
        }
    };

    return (
        <Container className="mt-5" onSubmit={handleOnClick}>
            <h1 className="fw-bold display-1 my-4">SIGNUP</h1>
            {invalid && <Alert variant="danger">{invalidMessage}</Alert>}
            <Form>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="fw-bold">Address</Form.Label>
                    <Form.Control placeholder="Enter address" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="fw-bold">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="role">
                    <Form.Label className="fw-bold">Role</Form.Label>
                    <Form.Select placeholder="Role">
                        <option defaultValue value="SELLER">
                            Seller
                        </option>
                        <option value="BUYER">Buyer</option>
                        <option value="CARRIER">Carrier</option>
                        <option value="LOGISTICS">Logistics</option>
                        <option value="CUSTOM">custom</option>
                    </Form.Select>
                </Form.Group>
                <div className="text-center my-5 mx-auto">
                    <Button
                        className="block justify-center"
                        variant="primary"
                        type="submit"
                    >
                        Signup
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export const Signup = SignupComponent;
export default Signup;

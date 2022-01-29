import React from "react";
import { Form, Button } from "react-bootstrap";
import { getCookie, verifyUser } from "../../helpers";

export const VerifyUser = () => {
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const res = await verifyUser(getCookie("username"), e.target[0].value);
        console.log("res in admin ver user ---> ", res);
    };

    return (
        <div className="container">
            <Form onSubmit={handleOnSubmit}>
                <Form.Group>
                    <Form.Label className="fw-bold ">User address</Form.Label>
                    <Form.Control />
                </Form.Group>
                <Button type="submit" className="primary block w-100 my-4">
                    Verify
                </Button>
            </Form>
        </div>
    );
};

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { getCookie, verifyUser } from "../../helpers";

export const VerifyUser = () => {
    const [verified, setVerified] = useState(false);

    const handleOnSubmit = async (e) => {
        setVerified(false);
        e.preventDefault();
        const res = await verifyUser(getCookie("username"), e.target[0].value);
        if (res != false) {
            setVerified(true);
            setTimeout(() => {
                setVerified(false);
            }, 3000);
        }
        console.log("res in admin ver user ---> ", res);
    };

    return (
        <div className="container">
            {!verified ? (
                <Form onSubmit={handleOnSubmit}>
                    <Form.Group>
                        <Form.Label className="fw-bold ">
                            User address
                        </Form.Label>
                        <Form.Control />
                    </Form.Group>
                    <Button type="submit" className="primary block w-100 my-4">
                        Verify
                    </Button>
                </Form>
            ) : (
                <div>
                    <h1>Verified!</h1>
                </div>
            )}
        </div>
    );
};

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { exitApproval, getCookie } from "../../helpers";

export const ExitApproval = () => {
    const [shipmentID, setShipmentID] = useState(null);
    const handleOnSubmit = async (e) => {
        setShipmentID(null);
        e.preventDefault();
        const res = await exitApproval(
            getCookie("username"),
            e.target[0].value
        );
        if (res != false) {
            setShipmentID(true);
            setTimeout(() => {
                setShipmentID(false);
            }, 3000);
        }
        console.log("res in customExitApproval ---> ", res);
    };

    return (
        <div className="container">
            {!shipmentID ? (
                <Form onSubmit={handleOnSubmit}>
                    <Form.Group>
                        <Form.Label className="fw-bold ">
                            Shipment Id
                        </Form.Label>
                        <Form.Control />
                    </Form.Group>
                    <Button type="submit" className="primary block w-100 my-4">
                        Approve exit
                    </Button>
                </Form>
            ) : (
                <div>
                    <h1>Approved!</h1>
                </div>
            )}
        </div>
    );
};

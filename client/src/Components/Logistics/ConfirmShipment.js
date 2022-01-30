import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { confirmShipment, getCookie } from "../../helpers";

export const ConfirmShipment = () => {
    const [shipmentID, setShipmentID] = useState(null);
    const handleOnSubmit = async (e) => {
        setShipmentID(null);
        e.preventDefault();
        const res = await confirmShipment(
            getCookie("username"),
            e.target[0].value
        );
        if (res != false) {
            setShipmentID(true);
        }
        console.log("res in logi confirm shipment ---> ", res);
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
                        Confirm
                    </Button>
                </Form>
            ) : (
                <div>
                    <h1>Confirmed!</h1>
                </div>
            )}
        </div>
    );
};

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { confirmDelivery, getCookie } from "../../helpers";

export const ConfirmDelivery = () => {
    const [shipmentID, setShipmentID] = useState(null);
    const handleOnSubmit = async (e) => {
        setShipmentID(null);
        e.preventDefault();
        const res = await confirmDelivery(
            getCookie("username"),
            e.target[0].value
        );
        if (res != false) {
            setShipmentID(true);
            setTimeout(() => {
                setShipmentID(false);
            }, 3000);
        }
        console.log("res in buyer approve ---> ", res);
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
                        Confirmed!
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

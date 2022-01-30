import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { createShipment, getCookie } from "../../helpers";

export const CreateShipment = () => {
    const [shipmentID, setShipmentID] = useState(null);
    const handleOnSubmit = async (e) => {
        setShipmentID(null);
        e.preventDefault();
        const res = await createShipment(
            getCookie("username"),
            e.target[0].value,
            e.target[1].value,
            e.target[2].value
        );
        if (res != false) {
            setShipmentID(
                res?.events?.CreateShipment?.returnValues?.id ?? null
            );
        }
        console.log("res in logi create shipment ---> ", res);
    };

    return (
        <div className="container">
            <Form onSubmit={handleOnSubmit}>
                <Form.Group>
                    <Form.Label className="fw-bold ">Seller address</Form.Label>
                    <Form.Control />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="fw-bold ">Buyer address</Form.Label>
                    <Form.Control />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="fw-bold">Price</Form.Label>
                    <Form.Control type="number" placeholder="Price in wei" />
                </Form.Group>
                <Button type="submit" className="primary block w-100 my-4">
                    Create
                </Button>
                {shipmentID && (
                    <div>
                        <h1>
                            {"Shipment id: "}
                            <b>{shipmentID}</b>
                        </h1>
                    </div>
                )}
            </Form>
        </div>
    );
};

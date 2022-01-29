import React from "react";
import { Form, Button } from "react-bootstrap";
import { createShipment, getCookie } from "../../helpers";

export const CreateShipment = () => {
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const res = await createShipment(
            getCookie("username"),
            e.target[0].value,
            e.target[1].value,
            e.target[2].value
        );
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
            </Form>
        </div>
    );
};

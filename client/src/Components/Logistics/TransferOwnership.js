import React from "react";
import { Form, Button } from "react-bootstrap";
import { transferOwnership, getCookie } from "../../helpers";

export const TransferOwnership = () => {
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const res = await transferOwnership(
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
                    <Form.Label className="fw-bold ">Shipment Id</Form.Label>
                    <Form.Control type="number" placeholder="Shipment Id" />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="fw-bold ">
                        NewOwner address
                    </Form.Label>
                    <Form.Control />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="fw-bold">Owner Type</Form.Label>
                    <Form.Control />
                </Form.Group>
                <Button type="submit" className="primary block w-100 my-4">
                    Transfer
                </Button>
            </Form>
        </div>
    );
};

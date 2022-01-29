import React from "react";
import { Form, Button } from "react-bootstrap";
import { getShipment, getCookie } from "../../helpers";

export const ShowShipment = () => {
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        getShipment(getCookie("username"), e.target[0].value).then((res) => {
            console.log("res in logi create shipment ---> ", res);
        });
    };

    return (
        <div className="container">
            <Form onSubmit={handleOnSubmit}>
                <Form.Group>
                    <Form.Label className="fw-bold ">Shipment Id</Form.Label>
                    <Form.Control />
                </Form.Group>
                <Button type="submit" className="primary block w-100 my-4">
                    Get
                </Button>
            </Form>
        </div>
    );
};

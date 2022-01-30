import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { transferOwnership, getCookie } from "../../helpers";

export const TransferOwnership = () => {
    const [done, setDone] = useState(false);

    const handleOnSubmit = async (e) => {
        setDone(false);
        e.preventDefault();
        const res = await transferOwnership(
            getCookie("username"),
            e.target[0].value,
            e.target[1].value,
            e.target[2].value
        );
        if (res != false) {
            setDone(true);
            setTimeout(() => {
                setDone(false);
            }, 3000);
        }
        console.log("res in logi create shipment ---> ", res);
    };

    return (
        <div className="container">
            {!done ? (
                <Form onSubmit={handleOnSubmit}>
                    <Form.Group>
                        <Form.Label className="fw-bold ">
                            Shipment Id
                        </Form.Label>
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
                    <Button type="submit" className="primary block w-100 my-4">
                        Transfer
                    </Button>
                </Form>
            ) : (
                <div>
                    <h1>Transfered!</h1>
                </div>
            )}
        </div>
    );
};

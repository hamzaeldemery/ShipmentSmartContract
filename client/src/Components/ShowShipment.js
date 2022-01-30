import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { getShipment, getCookie } from "../helpers";

const STATUS = ["PENDING", "SHIPPING", "SHIPPED", "DELIVERED"];

export const ShowShipment = () => {
    const [data, setData] = useState(false);
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const shipment = await getShipment(
            getCookie("username"),
            e.target[0].value
        );
        if (shipment != false) {
            setData(shipment);
        }
        console.log(shipment);
    };
    const copyButton = (address) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-clipboard"
                viewBox="0 0 16 16"
                style={{ cursor: "pointer", maxWidth: "1rem" }}
                onClick={() => {
                    navigator.clipboard.writeText(address);
                }}
            >
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
            </svg>
        );
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
                {data && (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th style={{ width: "9rem" }}>Seller</th>
                                <th style={{ width: "9rem" }}>Buyer</th>
                                <th style={{ width: "9rem" }}>Owner</th>
                                <th>Status</th>
                                <th>Price</th>
                                <th>Paid</th>
                                <th>Custom Exit Approval</th>
                                <th>Custom Entry Approval</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.id}</td>
                                <td>
                                    <div
                                        style={{ width: "9rem" }}
                                        className="d-inline-block align-items-center"
                                    >
                                        <span
                                            style={{
                                                maxWidth: "7rem",
                                                // textAlign: "center",
                                            }}
                                            className="d-inline-block text-truncate mx-2"
                                        >
                                            {data.seller}
                                        </span>
                                        {copyButton(data.seller)}
                                    </div>
                                </td>
                                <td>
                                    <div
                                        style={{ width: "9rem" }}
                                        className="d-inline-block align-items-center"
                                    >
                                        <span
                                            style={{
                                                maxWidth: "7rem",
                                                // textAlign: "center",
                                            }}
                                            className="d-inline-block text-truncate mx-2"
                                        >
                                            {data.buyer}
                                        </span>
                                        {copyButton(data.buyer)}
                                    </div>
                                </td>
                                <td>
                                    <div
                                        style={{ width: "9rem" }}
                                        className="d-inline-block align-items-center"
                                    >
                                        <span
                                            style={{
                                                maxWidth: "7rem",
                                                // textAlign: "center",
                                            }}
                                            className="d-inline-block  text-truncate mx-2"
                                        >
                                            {data.ownerId}
                                        </span>
                                        {copyButton(data.ownerId)}
                                    </div>
                                </td>
                                <td>{STATUS[data.status]}</td>
                                <td>{data.price}</td>
                                <td>{data.paid ? "Yes" : "No"}</td>
                                <td>{data.customExit ? "Yes" : "No"}</td>
                                <td>{data.customEnter ? "Yes" : "No"}</td>
                            </tr>
                        </tbody>
                    </Table>
                )}
            </Form>
        </div>
    );
};

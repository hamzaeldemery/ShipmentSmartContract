import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { Card } from "../Card";
import { CreateShipment } from "./CreateShipment";
import { ShowShipment } from "./ShowShipment";
import { TransferOwnership } from "./TransferOwnership";

export const Logistics = ({ contract }) => {
    const funcs = {
        createShipment: {
            title: "Create Shipment",
            comp: <CreateShipment />,
        },
        transferOwner: {
            title: "Transfer Ownership",
            comp: <TransferOwnership />,
        },
        startShipment: {
            title: "Start Shipment",
            comp: null,
        },
        confirmShipment: {
            title: "Confirm Shipment",
            comp: null,
        },
        showShipment: {
            title: "Show Shipment",
            comp: <ShowShipment />,
        },
    };

    const [comp, setComp] = useState(null);
    const [clicked, setClicked] = useState("");
    return (
        <div className="container">
            <div className="container">
                <Row xs={2} md={4} className="g-4">
                    {Object.keys(funcs).map((key, val) => {
                        return (
                            <Card
                                key={funcs[key].title}
                                title={funcs[key].title}
                                color={
                                    clicked == funcs[key].title
                                        ? "secondary"
                                        : "dark"
                                }
                                onClick={() => {
                                    if (clicked != funcs[key].title) {
                                        setClicked(funcs[key].title);
                                        setComp(funcs[key].comp);
                                    } else {
                                        setClicked("");
                                        setComp(null);
                                    }
                                }}
                            />
                        );
                    })}
                </Row>
            </div>
            <div>{comp}</div>
        </div>
    );
};

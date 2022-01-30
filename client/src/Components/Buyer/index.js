import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { Card } from "../Card";
import { ShowShipment } from "../ShowShipment";
import { PayShipment } from "./PayShipment";
import { ConfirmDelivery } from "./ConfirmDelivery";

export const Buyer = () => {
    const funcs = {
        pay: {
            title: "Pay Shipment",
            comp: <PayShipment />,
        },
        confirm: {
            title: "Confirm Delivery",
            comp: <ConfirmDelivery />,
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
                                    clicked === funcs[key].title
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

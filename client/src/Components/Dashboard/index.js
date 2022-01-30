import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { Card } from "../Card";
import { ShowShipment } from "../ShowShipment";

export const Dashboard = () => {
    const [comp, setComp] = useState(null);
    const [clicked, setClicked] = useState("");
    return (
        <div className="container">
            <div className="container">
                <Row xs={2} md={4} className="g-4">
                    <Card
                        title="Show shipment"
                        color={
                            clicked === "showShipment" ? "secondary" : "dark"
                        }
                        onClick={() => {
                            if (clicked != "showShipment") {
                                setClicked("showShipment");
                                setComp(<ShowShipment />);
                            } else {
                                setClicked("");
                                setComp(null);
                            }
                        }}
                    />
                </Row>
            </div>
            <div>{comp}</div>
        </div>
    );
};

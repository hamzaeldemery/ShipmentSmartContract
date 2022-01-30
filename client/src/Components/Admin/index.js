import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { Card } from "../Card";
import { VerifyUser } from "./VerifyUser";
import { ShowShipment } from "../ShowShipment";

export const Admin = () => {
    const [comp, setComp] = useState(null);
    const [clicked, setClicked] = useState("");
    return (
        <div className="container">
            <div className="container">
                <Row xs={2} md={4} className="g-4">
                    <Card
                        title="Verify user"
                        color={clicked === "verifyUser" ? "secondary" : "dark"}
                        onClick={() => {
                            if (clicked != "verifyUser") {
                                setClicked("verifyUser");
                                setComp(<VerifyUser />);
                            } else {
                                setClicked("");
                                setComp(null);
                            }
                        }}
                    />
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

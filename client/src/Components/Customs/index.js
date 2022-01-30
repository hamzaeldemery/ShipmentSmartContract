import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { Card } from "../Card";
import { ShowShipment } from "../ShowShipment";
import { ExitApproval } from "./ExitApproval";
import { EntryApproval } from "./EntryApproval";

export const Customs = () => {
    const funcs = {
        approveExit: {
            title: "Exit Approval",
            comp: <ExitApproval />,
        },
        approveEntry: {
            title: "Entry Approval ",
            comp: <EntryApproval />,
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

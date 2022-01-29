import React from "react";
import { Col, Card as _Card } from "react-bootstrap";

export const Card = ({ title, color, onClick }) => {
    return (
        <Col onClick={onClick} style={{ cursor: "pointer" }}>
            <_Card
                bg={color}
                text={"dark".toLowerCase() === "light" ? "dark" : "white"}
                style={{ maxWidth: "15rem", height: "6rem" }}
                className="mb-2"
            >
                <_Card.Body className="">
                    <_Card.Title>{title} </_Card.Title>
                </_Card.Body>
            </_Card>
        </Col>
    );
};

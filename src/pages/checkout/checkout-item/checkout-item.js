import React from "react";
import { Col, Row } from "react-bootstrap";
import { NumberIncrement } from "../../../components/app/numberIncrement";
import { decimalFormatter } from "../../../utils/decimalFormatter";

export const CheckoutItem = ({ item, onUpdate }) => {
    return (
        <div className="container card h-100 d-inline-block partner-card" style={{ width: "100%", marginLeft: "0" }}>
            <Row>
                <Col md={2} style={{ padding: "0" }}>
                    <img
                        src="./lanche.jpg"
                        alt=""
                        className="rounded-start rounded-end justify-content-start"
                        height="100%"
                        width="100%"
                        style={{ cursor: "pointer" }}
                        onClick={() => {}}
                    />
                </Col>
                <Col md={8}>
                    <Row style={{ paddingTop: "5px" }}>
                        <Col>
                            <h1 className="partner-title" onClick={() => {}}>
                                {item.quantity}x {item.name}
                            </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="partner-text">R$ {decimalFormatter(item.price * item.quantity, 2)}</Col>
                    </Row>
                    <Row>
                        <Col className="partner-text">{item.description}</Col>
                    </Row>
                </Col>
                <Col md={2} style={{ alignSelf: "center" }}>
                    <NumberIncrement
                        min={0}
                        max={100}
                        value={item.quantity}
                        id={item.id}
                        onUpdate={(item) => {
                            onUpdate(item);
                        }}
                    />
                </Col>
            </Row>
        </div>
    );
};

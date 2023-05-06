import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";

export const CheckoutFinish = () => {
    const location = useLocation();
    const { state } = location;
    const { orderNumber } = state || {};
    const nav = useNavigate();

    return (
        <Container>
            <Row>
                <Card>
                    <Card.Body>
                        <h1>Pedido finalizado: {orderNumber.data}</h1>
                    </Card.Body>
                </Card>
            </Row>
            <Row>
                <Col md={4}></Col>
                <Col md={4}>
                    <Button className="w-100" onClick={() => nav("/")}>
                        Início
                    </Button>
                </Col>
                <Col md={4}></Col>
            </Row>
        </Container>
    );
};

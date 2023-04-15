import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export const PaymentItem = ({ item, onCardSelect }) => {
    return (
        <Container style={{ cursor: "pointer" }} onClick={() => onCardSelect(item.creditCardId)}>
            <Card>
                <Card.Body>
                    <Row>
                        <Col md={1}>
                            <img src={item.creditCardImage} height={16} width={32} alt="" />
                        </Col>
                        <Col md={11}>{item.creditCardNumber}</Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

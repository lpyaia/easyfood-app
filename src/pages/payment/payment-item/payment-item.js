import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { getCreditCardFlagByEnum } from "../../../utils/getCreditCardFlag";
import { BsFillTrash3Fill } from "react-icons/bs";

export const PaymentItem = ({ item, onCardSelect, onCreditCardExclusion }) => {
    return (
        <>
            <Container style={{ cursor: "pointer" }}>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col md={1} onClick={() => onCardSelect(item.creditCardId)}>
                                <img src={getCreditCardFlagByEnum(item.creditCardFlag)} height={16} width={32} alt="" />
                            </Col>
                            <Col md={10} onClick={() => onCardSelect(item.creditCardId)}>
                                {item.creditCardNumber}
                            </Col>
                            <Col md={1}>
                                <BsFillTrash3Fill
                                    size={20}
                                    color="red"
                                    onClick={() => onCreditCardExclusion(item.creditCardId)}
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

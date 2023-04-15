import React from "react";
import { Accordion, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { PaymentItem } from "./payment-item/payment-item";

export const Payment = ({ onSelectCreditCard }) => {
    const paymentsAvailable = [
        {
            creditCardId: "0a81c52b-7d2e-49ca-9e4e-e11e8693d2e3",
            creditCardImage: "./mastercard-logo.png",
            creditCardNumber: "**** **** **** 7551",
            creditCard: "MasterCard",
        },
        {
            creditCardId: "d4b2c9c9-03eb-4552-a5b3-659d707b13be",
            creditCardImage: "./visa-logo.png",
            creditCardNumber: "**** **** **** 9999",
            creditCard: "Visa",
        },
    ];

    const handleCardSelection = (id) => {
        onSelectCreditCard(id);
    };

    return (
        <Container>
            {paymentsAvailable &&
                paymentsAvailable.length > 0 &&
                paymentsAvailable.map((item) => {
                    return <PaymentItem item={item} onCardSelect={(id) => handleCardSelection(id)} />;
                })}
            {paymentsAvailable == null && (
                <Container>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col className="d-flex justify-content-center">Cadastre abaixo o seu cartão ;)</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            )}
            <Container>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Cadastrar um novo cartão</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Label>Número Cartão de Crédito</Form.Label>
                                        <Form.Control type="text" placeholder="0000-0000-0000-0000" />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Label>Nome do Titular</Form.Label>
                                        <Form.Control type="text" placeholder="FULANO DE TAL" />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Label>Validade</Form.Label>
                                        <Form.Control type="text" placeholder="MM/AAAA" />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label>CVV</Form.Label>
                                        <Form.Control type="text" placeholder="000" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="d-flex justify-content-end">
                                        <Button className="btn btn-primary">Cadastrar</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </Container>
    );
};

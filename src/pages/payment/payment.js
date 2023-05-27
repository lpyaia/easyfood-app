import React, { useEffect } from "react";
import { Accordion, Button, Card, Col, Container, Form, FormControl, Modal, Row } from "react-bootstrap";
import { PaymentItem } from "./payment-item/payment-item";
import customerApiService from "../../services/customerApiService";
import { useState } from "react";
import InputMask from "react-input-mask";
import { useStore } from "react-hookstore";
import { getCreditCardFlagByCardNumber } from "../../utils/getCreditCardFlag";
import { toast } from "react-toastify";

export const Payment = ({ onSelectCreditCard, customerId }) => {
    const [paymentsAvailable, setPaymentsAvailable] = useState([]);
    const [creditCardFlag, setCreditCardFlag] = useState(null);
    const [creditCardInputMask, setCreditCardInputMask] = useState("9999-9999-9999-9999");
    const [newCreditCard, setNewCreditCard] = useState({});
    const [validated, setValidated] = useState(false);
    const [, setSpinner] = useStore("spinnerEnabled");
    const [testKey, setTestKey] = useState(0);
    const [isCreditCardExclusionModalOpened, setIsCreditCardExclusionModalOpened] = useState(false);
    const [selectedCreditCardId, setSelectedCreditCardId] = useState();

    useEffect(() => {
        fetchData(customerId);
    }, []);

    const handleCardSelection = (id) => {
        const creditCard = paymentsAvailable.find((x) => x.creditCardId === id);

        setSelectedCreditCardId(id);
        onSelectCreditCard(creditCard);
    };

    async function fetchData(customerId) {
        const result = await customerApiService.getCreditCards(customerId);
        if (result?.data) {
            setPaymentsAvailable(result.data);
        }
    }

    const detectCreditCardType = (cardNumber) => {
        setCreditCardInputMask("9999-9999-9999-9999");
        setCreditCardFlag(getCreditCardFlagByCardNumber(cardNumber));

        if (/^3[47]/.test(cardNumber)) {
            setCreditCardInputMask("9999-999999-99999");
        }
    };

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        if (form.checkValidity() === false) {
            setValidated(true);
        } else {
            try {
                setSpinner(true);
                await customerApiService.createCreditCard(customerId, newCreditCard);
                await fetchData(customerId);
                resetFields();
            } catch (err) {
                console.log("err: ", err);
            } finally {
                setSpinner(false);
            }
        }
    };

    const resetFields = () => {
        setCreditCardFlag();
        setNewCreditCard({});
        setTestKey(testKey + 1);
    };

    const handleCreditCardDelete = (creditCardId) => {
        setIsCreditCardExclusionModalOpened(true);
        setSelectedCreditCardId(creditCardId);
    };

    const deleteCreditCard = async () => {
        await customerApiService.deleteCreditCard(customerId, selectedCreditCardId);
        await fetchData(customerId);

        setIsCreditCardExclusionModalOpened(false);
        toast.success("Credit Card has been deleted");
    };

    return (
        <>
            {!isCreditCardExclusionModalOpened && (
                <Container>
                    {paymentsAvailable &&
                        paymentsAvailable.length > 0 &&
                        paymentsAvailable.map((item) => {
                            return (
                                <PaymentItem
                                    item={item}
                                    onCardSelect={(id) => handleCardSelection(id)}
                                    onCreditCardExclusion={(id) => handleCreditCardDelete(id)}
                                />
                            );
                        })}
                    {paymentsAvailable.length === 0 && (
                        <Container>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col className="d-flex justify-content-center">
                                            Cadastre abaixo o seu cartão ;)
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Container>
                    )}
                    <Container key={testKey}>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Cadastrar um novo cartão</Accordion.Header>
                                <Accordion.Body>
                                    <Form onSubmit={handleSubmit.bind(this)} validated={validated} noValidate>
                                        <Row>
                                            <Col>
                                                <Form.Label>
                                                    Número Cartão de Crédito (mastercard, visa, american express)
                                                </Form.Label>
                                                <FormControl
                                                    type="text"
                                                    as={InputMask}
                                                    mask={creditCardInputMask}
                                                    maskChar=""
                                                    placeholder="0000-0000-0000-0000"
                                                    className="form-control"
                                                    value={newCreditCard.number}
                                                    onChange={(event) => {
                                                        const cardNumber = event.target.value;
                                                        detectCreditCardType(cardNumber);
                                                        setNewCreditCard({ ...newCreditCard, number: cardNumber });
                                                    }}
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="d-flex justify-content-end">
                                                {creditCardFlag && (
                                                    <img
                                                        src={creditCardFlag}
                                                        height={32}
                                                        width={48}
                                                        alt=""
                                                        style={{ marginTop: "10px", marginBottom: "10px" }}
                                                    />
                                                )}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Label>Primeiro nome do Titular</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="FULANO DE TAL"
                                                    maxLength={100}
                                                    className="form-control"
                                                    onChange={(event) =>
                                                        setNewCreditCard({
                                                            ...newCreditCard,
                                                            cardholderFirstName: event.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label>Sobrenome do Titular</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="FULANO DE TAL"
                                                    maxLength={100}
                                                    className="form-control"
                                                    onChange={(event) =>
                                                        setNewCreditCard({
                                                            ...newCreditCard,
                                                            cardholderLastName: event.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Label>Validade</Form.Label>
                                                <FormControl
                                                    type="text"
                                                    as={InputMask}
                                                    mask="99/9999"
                                                    maskChar=""
                                                    className="form-control"
                                                    placeholder="MM/AAAA"
                                                    onChange={(event) =>
                                                        setNewCreditCard({
                                                            ...newCreditCard,
                                                            expirationDate: event.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label>CVV</Form.Label>
                                                <FormControl
                                                    type="text"
                                                    as={InputMask}
                                                    mask="999"
                                                    maskChar=""
                                                    className="form-control"
                                                    placeholder="000"
                                                    onChange={(event) =>
                                                        setNewCreditCard({
                                                            ...newCreditCard,
                                                            cvcCode: event.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="d-flex justify-content-end">
                                                <Button className="btn btn-primary" type="submit">
                                                    Cadastrar
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Container>
                </Container>
            )}
            <Modal
                show={isCreditCardExclusionModalOpened}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton onClick={() => setIsCreditCardExclusionModalOpened(false)}>
                    <Modal.Title id="contained-modal-title-vcenter">Selecione o seu cartão de crédito</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que quer excluir?</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => deleteCreditCard()}>Sim</Button>
                    <Button onClick={() => setIsCreditCardExclusionModalOpened(false)}>Não</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

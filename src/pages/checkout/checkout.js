import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { decimalFormatter } from "../../utils/decimalFormatter";
import { CheckoutItem } from "./checkout-item/checkout-item";
import { useNavigate } from "react-router-dom";
import { Payment } from "../payment/payment";
import { UserInfoContext } from "../../App";
import { getCreditCardFlagByEnum } from "../../utils/getCreditCardFlag";
import { AiOutlineClose } from "react-icons/ai";
import ordersApiService from "../../services/ordersApiService";

export const Checkout = () => {
    const location = useLocation();
    const { state } = location;
    const { order } = state || {};
    const [checkoutOrder, setCheckoutOrder] = useState(order);
    const [isPaymentsVisible, setIsPaymentsVisible] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const navigate = useNavigate();
    const userInfo = React.useContext(UserInfoContext);

    useEffect(() => {
        console.log(checkoutOrder);
    }, [checkoutOrder]);

    const onChangedItem = (item) => {
        const changedItem = checkoutOrder.items.find((x) => x.id === item.id);
        changedItem.quantity = item.newValue;

        if (changedItem.quantity === 0) {
            const index = checkoutOrder.items.indexOf(changedItem);
            checkoutOrder.items.splice(index, 1);
        }

        updateTotal();
        updateList();
    };

    const updateList = () => {
        const tempCheckoutOrder = { ...checkoutOrder };

        setCheckoutOrder(null);
        setTimeout(() => {
            setCheckoutOrder(tempCheckoutOrder);
        }, 5);
    };

    const updateTotal = () => {
        if (checkoutOrder.items.length > 0) {
            const newTotal = checkoutOrder.items.reduce((acc, curr) => {
                return acc + curr.price * curr.quantity;
            }, 0);

            checkoutOrder.total = newTotal;
        } else {
            back();
        }
    };

    const back = () => {
        navigate(`/menu?id=${checkoutOrder.partnerId}`);
    };

    const selectPayment = () => {
        setIsPaymentsVisible(true);
    };

    const closeModal = () => {
        setIsPaymentsVisible(false);
    };

    const handleCreditCardSelection = (creditCard) => {
        setSelectedPayment(creditCard);
        closeModal();
    };

    const finishOrder = async () => {
        const order = {
            items: checkoutOrder.items.map((item) => {
                const itemSummary = {
                    itemId: item.id,
                    quantity: item.quantity,
                };
                return itemSummary;
            }),
            customerId: userInfo.id,
            creditCardId: selectedPayment.creditCardId,
            partnerId: checkoutOrder.partnerId,
        };

        const orderNumber = await ordersApiService.createOrder(order);
        navigate("/checkout-finish", { state: { orderNumber } });
    };

    return (
        <>
            <h1>Checkout</h1>
            <Container>
                {checkoutOrder &&
                    checkoutOrder.items.map((item) => {
                        return <CheckoutItem item={item} onUpdate={(item) => onChangedItem(item)} />;
                    })}
                <Row>
                    {!selectedPayment && (
                        <Col md={12}>
                            <Card>
                                <Card.Body style={{ cursor: "pointer" }} onClick={() => selectPayment()}>
                                    Selecione o método de pagamento
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                    {selectedPayment && (
                        <Col md={12}>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col md={1}>
                                            <img
                                                src={getCreditCardFlagByEnum(selectedPayment.creditCardFlag)}
                                                height={16}
                                                width={32}
                                                alt=""
                                            />
                                        </Col>
                                        <Col className="d-flex justify-content-start" md={10}>
                                            {selectedPayment.creditCardNumber}
                                        </Col>
                                        <Col>
                                            <AiOutlineClose
                                                cursor={"pointer"}
                                                size={20}
                                                color="red"
                                                onClick={() => setSelectedPayment(null)}
                                            ></AiOutlineClose>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
                <Row class="d-flex">
                    <Col className="d-flex justify-content-start" md={8} style={{ display: "flex" }}>
                        <h2>Total: R$ {decimalFormatter(checkoutOrder?.total, 2)}</h2>
                    </Col>
                    <Col className="d-flex" style={{ display: "flex" }} md={"2"}>
                        <Button className="w-100" variant="secondary" onClick={() => back()}>
                            Voltar
                        </Button>
                    </Col>
                    <Col className="d-flex" style={{ display: "flex" }} md={"2"}>
                        <Button
                            className="w-100"
                            variant="success"
                            disabled={!selectedPayment}
                            onClick={() => finishOrder()}
                        >
                            Finalizar
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Modal show={isPaymentsVisible} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onClick={() => closeModal()}>
                    <Modal.Title id="contained-modal-title-vcenter">Selecione o seu cartão de crédito</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Payment
                        onSelectCreditCard={(creditCard) => handleCreditCardSelection(creditCard)}
                        customerId={userInfo.id}
                    ></Payment>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => closeModal()}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

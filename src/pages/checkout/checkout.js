import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { decimalFormatter } from "../../utils/decimalFormatter";
import { CheckoutItem } from "./checkout-item/checkout-item";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
    const location = useLocation();
    const { state } = location;
    const { order } = state || {};
    const [checkoutOrder, setCheckoutOrder] = useState(order);
    const navigate = useNavigate();

    console.log(location);
    console.log(state);
    console.log(order);

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

    return (
        <>
            <h1>Checkout</h1>
            {checkoutOrder &&
                checkoutOrder.items.map((item) => {
                    return <CheckoutItem item={item} onUpdate={(item) => onChangedItem(item)} />;
                })}
            <Container>
                <Row>
                    <Col className="justify-content-start" md={6} style={{ display: "flex" }}>
                        <h2>Total: R$ {decimalFormatter(checkoutOrder?.total, 2)}</h2>
                    </Col>
                    <Col>
                        <Button className="w-100" variant="secondary" onClick={() => back()}>
                            Voltar
                        </Button>
                    </Col>
                    <Col>
                        <Button className="w-100" variant="success">
                            Pagar
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

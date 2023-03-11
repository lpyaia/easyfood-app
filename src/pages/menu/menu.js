import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { decimalFormatter } from "../../utils/decimalFormatter";
import { MenuItem } from "./menu-item/menu-item";

export const Menu = () => {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const [lojaId, setLojaId] = useState();
    const [total, setTotal] = useState(0);
    const [reset, setReset] = useState(0);
    const [totalItems, setTotalItems] = useState({});
    const [data, setData] = useState([
        {
            id: "8139feef-4071-4a50-8604-851e04cfe157",
            price: 5.5,
            name: "McLanche Infeliz",
            description: "bla, bla, bla, bla, bla, bla",
        },
        {
            id: "05ca37d0-b843-43c8-96c4-d388153050d9",
            price: 10,
            name: "Mini Tasty",
            description: "bla, bla, bla, bla, bla, bla",
        },
        {
            id: "008a943a-8324-46da-abb4-1c80a6d717a4",
            price: 2.89,
            name: "Mini Mc",
            description: "bla, bla, bla, bla, bla, bla",
        },
        {
            id: "47872db9-8650-46f8-a455-bb0ccde6cc0b",
            price: 7.99,
            name: "Uaupper",
            description: "bla, bla, bla, bla, bla, bla",
        },
        {
            id: "68a957e8-ee45-4ba9-8ce5-4b5a4505928a",
            price: 5,
            name: "X-Podrão",
            description: "bla, bla, bla, bla, bla, bla",
        },
    ]);

    useEffect(() => {
        const id = searchParams.get("id");
        setLojaId(id);
        clear();
    }, []);

    const onChangedItem = (item) => {
        const changedItem = totalItems.find((x) => x.id === item.id);
        changedItem.quantity = item.newValue;
        updateTotal();
    };

    const updateTotal = () => {
        if (totalItems.length > 0) {
            const newTotal = totalItems.reduce((acc, curr) => {
                return acc + curr.price * curr.quantity;
            }, 0);

            setTotal(newTotal);
        }
    };

    const checkout = () => {
        const orderItems = totalItems.filter((x) => x.quantity > 0);
        const order = {
            partnerId: lojaId,
            items: orderItems,
            total: total,
        };

        navigate("/checkout", { state: { order } });
    };

    const clear = () => {
        const items = [];

        data.forEach((e) => {
            items.push({
                id: e.id,
                price: e.price,
                quantity: 0,
                description: e.description,
                name: e.name,
            });
        });

        setTotalItems(items);
        setTotal(0);
        setReset(reset + 1);

        const auxData = [...data];
        setData([]);

        setTimeout(() => {
            setData(auxData);
        }, 5);
    };

    return (
        <>
            {data.map((e) => {
                return <MenuItem item={e} onUpdate={(value) => onChangedItem(value)} />;
            })}

            <Container>
                <Row>
                    <Col className="justify-content-start" md={6} style={{ display: "flex" }}>
                        <h2>Total: R$ {decimalFormatter(total, 2)}</h2>
                    </Col>
                    <Col md={2}>
                        <Button className="w-100" variant="secondary" onClick={() => navigate("/")}>
                            Voltar
                        </Button>
                    </Col>
                    <Col md={2}>
                        <Button className="w-100" variant="danger" onClick={() => clear()}>
                            Limpar
                        </Button>
                    </Col>

                    <Col md={2}>
                        <Button className="w-100" variant="success" onClick={() => checkout()} disabled={total <= 0}>
                            Método de Pagamento
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

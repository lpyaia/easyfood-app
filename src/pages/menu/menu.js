import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { decimalFormatter } from "../../utils/decimalFormatter";
import { MenuItem } from "./menu-item/menu-item";
import partnersService from "../../services/merchantService";

export const Menu = () => {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const [lojaId, setLojaId] = useState();
    const [total, setTotal] = useState(0);
    const [reset, setReset] = useState(0);
    const [totalItems, setTotalItems] = useState({});
    const [data, setData] = useState([]);

    useEffect(() => {
        const lojaId = searchParams.get("id");

        setLojaId(lojaId);
        fetchData(lojaId);
    }, []);

    const fetchData = async (lojaId) => {
        const result = await partnersService.getPartnerMenu(lojaId);

        const items = [];

        result.data.forEach((e) => {
            items.push({
                id: e.id,
                price: e.price,
                quantity: 0,
                description: e.description,
                name: e.name,
                image: e.image,
            });
        });

        setTotalItems(items);
        setTotal(0);
        setReset(reset + 1);

        const auxData = [...result.data];
        setData([]);

        setTimeout(() => {
            setData(auxData);
        }, 5);
    };

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

    const clear = () => {};

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
                            Pagar
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

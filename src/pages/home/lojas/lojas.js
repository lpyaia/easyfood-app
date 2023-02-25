import React, { useState } from "react";
import Loja from "./loja/loja";
import Row from "react-bootstrap/Row";
import { useEffect } from "react";
import partnersService from "../../../services/authService/merchantService";

const Lojas = () => {
    const [data, setData] = useState();

    useEffect(() => {
        async function fetchData() {
            const result = await partnersService.getPartnersPaginated(0);
            if (result?.data) {
                setData(result.data);
            }
        }

        fetchData();
    }, []);

    return (
        <Row style={{ height: "100px" }}>
            {data &&
                data.map((e) => {
                    return (
                        <Loja
                            nome={e.companyName}
                            avaliacao={e.score}
                            tempoEntrega={e.delivery.timeToDeliverInMinutes}
                            distancia={e.delivery.distanceInKilometers}
                            precoEntrega={e.delivery.deliveryPrice}
                            imagem={e.partnerLogo}
                        />
                    );
                })}
        </Row>
    );
};

export default Lojas;

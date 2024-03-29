import React, { useState } from "react";
import Loja from "./loja/loja";
import Row from "react-bootstrap/Row";
import Pagination from "react-bootstrap/Pagination";
import { useEffect } from "react";
import partnersService from "../../../services/merchantService";

const Lojas = ({ searchQuery, companyTypeQuery, tagsQuery }) => {
    const [data, setData] = useState();
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState(searchQuery);
    const [companyType, setCompanyType] = useState(companyTypeQuery);
    const [tags, setTags] = useState(companyTypeQuery);

    useEffect(() => {
        setSearch(searchQuery);
        setCompanyType(companyTypeQuery);
        setTags(tagsQuery);
        fetchData(0, searchQuery, companyTypeQuery, tagsQuery);
    }, [searchQuery, companyTypeQuery, tagsQuery]);

    async function fetchData(page = 0, search, companyType, tags) {
        const result = await partnersService.getPartnersPaginated(page, search, companyType, tags);
        if (result?.data) {
            setData(result.data);
            setTotalPages(result.totalPages);
            setCurrentPage(result.currentPage);
        }
    }

    const paginationItems = () => {
        let items = [];

        for (let i = 0; i < totalPages; i++) {
            items.push(
                <Pagination.Item key={i} active={i === currentPage} onClick={() => fetchData(i, search, companyType)}>
                    {i + 1}
                </Pagination.Item>
            );
        }

        return items;
    };

    return (
        <Row style={{}}>
            {data &&
                data.map((e) => {
                    return (
                        <Loja
                            id={e.id}
                            nome={e.companyName}
                            avaliacao={e.score}
                            tempoEntrega={e.delivery.timeToDeliverInMinutes}
                            distancia={e.delivery.distanceInKilometers}
                            precoEntrega={e.delivery.deliveryPrice}
                            imagem={e.partnerLogo}
                        />
                    );
                })}
            <Pagination className="d-flex justify-content-end">{paginationItems()}</Pagination>
        </Row>
    );
};

export default Lojas;

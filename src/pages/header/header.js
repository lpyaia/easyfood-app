import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../assets/images/logo512-easyfood.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/input.css";
import "./header.css";
import "../../assets/css/icon.css";
import { useState } from "react";
import { SwitchButton } from "../../components/app/switchButton";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import AsyncSelect from "react-select/async";
import { Container } from "react-bootstrap";
import merchantService from "../../services/merchantService";
import { selectStyle } from "../../components/app/selectStyle";

export const CompanyType = {
    Restaurant: 1,
    Pharmacy: 2,
    Market: 3,
};

export const HeaderContext = React.createContext();

function Header({ searchEnabled }) {
    const location = useLocation();
    const [search, setSearch] = useState("");
    const [companyTypes, setCompanyTypes] = useState([]);
    const [tags, setTags] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        const { search, companyType, tags } = location.state || {};

        setSearch(search);
        setCompanyTypes(companyType ?? []);
        setTags(tags ?? []);
    }, [location.state]);

    const onlyRestaurantIsEnabled = (companyTypes) => {
        return (
            companyTypes &&
            companyTypes.length === 1 &&
            companyTypes.find((a) => a === CompanyType.Restaurant) !== undefined
        );
    };

    const onRestaurantClick = (state) => {
        let auxCompanyTypes = [];
        let auxTags = tags;

        if (state) {
            auxCompanyTypes = [...companyTypes, CompanyType.Restaurant];
        } else {
            auxCompanyTypes = companyTypes?.filter((a) => a !== CompanyType.Restaurant);
        }

        if (!onlyRestaurantIsEnabled(auxCompanyTypes)) {
            setTags([]);
            auxTags = [];
        }

        setCompanyTypes(auxCompanyTypes);
        onSearch(auxCompanyTypes, auxTags);
    };

    const onMarketClick = (state) => {
        let auxCompanyTypes = [];

        if (state) {
            auxCompanyTypes = [...companyTypes, CompanyType.Market];
        } else {
            auxCompanyTypes = companyTypes?.filter((a) => a !== CompanyType.Market);
        }

        setTags([]);
        setCompanyTypes(auxCompanyTypes);
        onSearch(auxCompanyTypes, []);
    };

    const onPharmacyClick = (state) => {
        let auxCompanyTypes = [];

        if (state) {
            auxCompanyTypes = [...companyTypes, CompanyType.Pharmacy];
        } else {
            auxCompanyTypes = companyTypes?.filter((a) => a !== CompanyType.Pharmacy);
        }

        setTags([]);
        setCompanyTypes(auxCompanyTypes);
        onSearch(auxCompanyTypes, []);
    };

    const onSearch = (companyType, tags) => {
        nav("/", { state: { search, companyType, tags } });
    };

    const loadTags = async () => {
        const result = await merchantService.getTags();
        return result.data;
    };

    return (
        <>
            <Row className="border-bottom">
                <Col className="col-1 col-header-logo">
                    <img
                        className="d-flex justify-content-start"
                        width={64}
                        height={32}
                        alt="easy food"
                        src={logo}
                        style={{ cursor: "pointer" }}
                        onClick={() => nav("/")}
                    />
                </Col>
                <Col className="col-4 col-header-buttons">
                    {searchEnabled && (
                        <>
                            <Row>
                                <Col md={12}>
                                    <SwitchButton
                                        checked={companyTypes?.find((x) => x === CompanyType.Restaurant) !== undefined}
                                        onClick={(state) => onRestaurantClick(state)}
                                    >
                                        Restaurantes
                                    </SwitchButton>
                                    <SwitchButton
                                        checked={companyTypes?.find((x) => x === CompanyType.Market)}
                                        onClick={(state) => onMarketClick(state)}
                                    >
                                        Mercados
                                    </SwitchButton>
                                    <SwitchButton
                                        checked={companyTypes?.find((x) => x === CompanyType.Pharmacy)}
                                        onClick={(state) => onPharmacyClick(state)}
                                    >
                                        Farmácias
                                    </SwitchButton>
                                </Col>
                            </Row>
                            {onlyRestaurantIsEnabled(companyTypes) && (
                                <Row className="d-flex justify-content-center" style={{ marginBottom: "10px" }}>
                                    <Col md={8}>
                                        <AsyncSelect
                                            styles={selectStyle}
                                            isMulti
                                            cacheOptions
                                            value={tags}
                                            defaultOptions
                                            loadOptions={loadTags}
                                            onChange={(e) => {
                                                setTags(e);
                                                onSearch(companyTypes, e);
                                            }}
                                        />
                                    </Col>
                                </Row>
                            )}
                        </>
                    )}
                </Col>
                <Col className="col-3 col-header input-container">
                    {searchEnabled && (
                        <>
                            <i
                                className="bi bi-search icon"
                                style={{
                                    height: "30px",
                                    cursor: "pointer",
                                    borderColor: "#000",
                                    borderRadius: "0.375rem 0 0 0.375rem",
                                }}
                                onClick={() => onSearch(companyTypes, tags)}
                            ></i>
                            <input
                                className="input-field"
                                type="text"
                                value={search}
                                style={{
                                    borderColor: "#000",
                                    borderLeft: "0",
                                    borderRadius: "0 0.375rem 0.375rem 0",
                                }}
                                onKeyUp={(event) => {
                                    if (event.code === "Enter") {
                                        onSearch(companyTypes, tags);
                                    }
                                }}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                }}
                            ></input>
                        </>
                    )}
                </Col>
                <Col className="col-1 col-header-icon">
                    <a className="d-flex justify-content-end" href="/">
                        <i class="bi bi-person-circle default-icon" title="Meu usuário"></i>
                    </a>
                </Col>
                <Col className="col-1 col-header-icon">
                    <a className="d-flex justify-content-start" href="/">
                        <i class="bi bi-cart default-icon" title="Meu carrinho"></i>
                    </a>
                </Col>
                <Col className="col-1 col-header-icon">
                    <a className="d-flex justify-content-end" href="/logout">
                        <i class="bi bi-box-arrow-right default-icon" title="Sair"></i>
                    </a>
                </Col>
            </Row>
            <Container></Container>
        </>
    );
}

export default Header;

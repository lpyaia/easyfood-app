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
    const nav = useNavigate();

    useEffect(() => {
        const { search, companyType } = location.state || {};
        setSearch(search);
        setCompanyTypes(companyType);
    }, []);

    const onRestaurantClick = (state) => {
        let auxCompanyTypes = [];

        if (state) {
            auxCompanyTypes = [...companyTypes, CompanyType.Restaurant];
        } else {
            auxCompanyTypes = companyTypes.filter((a) => a !== CompanyType.Restaurant);
        }

        setCompanyTypes(auxCompanyTypes);
        onSearch(auxCompanyTypes);
    };

    const onMarketClick = (state) => {
        let auxCompanyTypes = [];

        if (state) {
            auxCompanyTypes = [...companyTypes, CompanyType.Market];
        } else {
            auxCompanyTypes = companyTypes.filter((a) => a !== CompanyType.Market);
        }

        setCompanyTypes(auxCompanyTypes);
        onSearch(auxCompanyTypes);
    };

    const onPharmacyClick = (state) => {
        let auxCompanyTypes = [];

        if (state) {
            auxCompanyTypes = [...companyTypes, CompanyType.Pharmacy];
        } else {
            auxCompanyTypes = companyTypes.filter((a) => a !== CompanyType.Pharmacy);
        }

        setCompanyTypes(auxCompanyTypes);
        onSearch(auxCompanyTypes);
    };

    const onSearch = (companyType) => {
        nav("/", { state: { search, companyType } });
    };

    return (
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
            <Col className="col-3 col-header-buttons">
                {searchEnabled && (
                    <>
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
                    </>
                )}
            </Col>
            <Col className="col-3 col-header input-container">
                {searchEnabled && (
                    <>
                        <i
                            className="bi bi-search icon"
                            style={{ height: "30px", cursor: "pointer" }}
                            onClick={() => onSearch(companyTypes)}
                        ></i>
                        <input
                            className="input-field"
                            type="text"
                            value={search}
                            onKeyUp={(event) => {
                                if (event.code === "Enter") {
                                    onSearch(companyTypes);
                                }
                            }}
                            onChange={(event) => {
                                setSearch(event.target.value);
                            }}
                        ></input>
                    </>
                )}
            </Col>
            <Col className="col-1 col-header">
                <p>Rua Antenor</p>
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
    );
}

export default Header;

import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../assets/images/logo512-easyfood.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/input.css";
import "../../assets/css/header.css";
import "../../assets/css/icon.css";

function Header() {
    return (
        <Row className="border-bottom">
            <Col className="col-1 col-header-logo">
                <img className="d-flex justify-content-start" width={64} height={32} alt="easy food" src={logo} />
            </Col>
            <Col className="col-1 col-header">
                <p>Restaurantes</p>
            </Col>
            <Col className="col-1 col-header">
                <p>Mercados</p>
            </Col>
            <Col className="col-1 col-header">
                <p>Farmácias</p>
            </Col>
            <Col className="col-3 col-header input-container">
                <i className="bi bi-search icon" style={{ height: "30px" }}></i>
                <input className="input-field" type="text"></input>
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

import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { decimalFormatter } from "../../../../utils/decimalFormatter";
import "./loja.css";

const Loja = ({ nome, avaliacao, tempoEntrega, distancia, imagem, precoEntrega }) => {
    return (
        <div className="card h-100 d-inline-block partner-card" style={{ width: "350px", height: "100px" }}>
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={`.${imagem}.png`}
                        alt=""
                        className="img-fluid rounded-start rounded-end"
                        height="100"
                        width="100"
                        style={{ marginTop: "3px" }}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="partner-title">{nome}</h5>
                        <div className="partner-info partner-text">
                            <svg
                                className="rating-star"
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M5.48279 0.313927L6.61067 2.70364C6.6891 2.86984 6.84075 2.98501 7.01618 3.01162L9.5383 3.39485C9.9801 3.46203 10.1564 4.02958 9.8368 4.35523L8.0118 6.21535C7.88497 6.34469 7.82698 6.53118 7.85702 6.71375L8.28777 9.34033C8.36328 9.80035 7.90145 10.1511 7.50637 9.93405L5.25063 8.69405C5.09376 8.60789 4.90624 8.60789 4.74937 8.69405L2.49363 9.93405C2.09855 10.1513 1.63672 9.80035 1.71223 9.34033L2.14298 6.71375C2.17302 6.53118 2.11503 6.34469 1.9882 6.21535L0.163203 4.35523C-0.156365 4.02936 0.019898 3.46182 0.461702 3.39485L2.98382 3.01162C3.15925 2.98501 3.3109 2.86984 3.38933 2.70364L4.51721 0.313927C4.71454 -0.104642 5.28525 -0.104642 5.48279 0.313927Z"></path>
                            </svg>
                            <span className="rating">{decimalFormatter(avaliacao, 1)}&nbsp;</span>• Lanchonete •{" "}
                            {decimalFormatter(distancia, 2)} km
                        </div>
                        <Row>
                            <Col className="partner-text">
                                {tempoEntrega} min • R$ {decimalFormatter(precoEntrega, 2)}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loja;

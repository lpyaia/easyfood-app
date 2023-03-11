import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

export const NumberIncrement = ({ min, max, id, value = 0, onUpdate }) => {
    const [currentValue, setCurrentValue] = useState(value);

    const onIncrement = () => {
        if (currentValue < max) {
            const newValue = currentValue + 1;
            setCurrentValue(newValue);
            onUpdate({ id, newValue });
        }
    };

    const onDecrement = () => {
        if (currentValue > min) {
            const newValue = currentValue - 1;
            setCurrentValue(newValue);
            onUpdate({ id, newValue });
        }
    };

    return (
        <Row style={{ justifyContent: "center" }}>
            <Col md={2} style={{ padding: "0" }}>
                <button
                    className="btn btn-danger d-grid w-100"
                    style={{
                        "--bs-btn-border-radius": "0",
                        "--bs-btn-focus-box-shadow": "0",
                        backgroundColor: "hsl(303deg 88% 26%)",
                        borderColor: "hsl(303deg 88% 26%)",
                        width: "40px !important",
                        height: "40px",
                    }}
                    onClick={() => onDecrement()}
                >
                    -
                </button>
            </Col>
            <Col md={2} className="input-container" style={{ padding: "0", alignItems: "center" }}>
                <input
                    className="input-field"
                    type="text"
                    value={currentValue}
                    style={{ height: "40px", textAlign: "center" }}
                />
            </Col>
            <Col md={2} style={{ padding: "0" }}>
                <button
                    className="btn btn-success d-grid w-100"
                    style={{
                        "--bs-btn-border-radius": "0",
                        "--bs-btn-focus-box-shadow": "0",
                        backgroundColor: "hsl(303deg 88% 26%)",
                        borderColor: "hsl(303deg 88% 26%)",
                        width: "40px !important",
                        height: "40px",
                    }}
                    onClick={() => onIncrement()}
                >
                    +
                </button>
            </Col>
        </Row>
    );
};

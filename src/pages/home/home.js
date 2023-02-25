import React from "react";
import Lojas from "./lojas/lojas";
import Container from "react-bootstrap/esm/Container";

function Home() {
    return (
        <Container>
            <Lojas></Lojas>
        </Container>
    );
}

export default Home;

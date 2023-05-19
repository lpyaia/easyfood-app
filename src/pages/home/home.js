import React from "react";
import Lojas from "./lojas/lojas";
import Container from "react-bootstrap/esm/Container";
import { useLocation, useNavigate } from "react-router";

function Home() {
    const location = useLocation();
    const { state } = location;
    const { search, companyType } = state || {};

    return (
        <Container>
            <Lojas searchQuery={search} companyTypeQuery={companyType}></Lojas>
        </Container>
    );
}

export default Home;

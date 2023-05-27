import React from "react";
import Lojas from "./lojas/lojas";
import Container from "react-bootstrap/esm/Container";
import { useLocation } from "react-router";

function Home() {
    const location = useLocation();
    const { state } = location;
    const { search, companyType, tags } = state || {};

    return (
        <Container>
            <Lojas searchQuery={search} companyTypeQuery={companyType} tagsQuery={tags}></Lojas>
        </Container>
    );
}

export default Home;

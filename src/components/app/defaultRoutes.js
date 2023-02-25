import React from "react";
import PropTypes from "prop-types";
import Header from "../../pages/header/header";

const DefaultRoutes = ({ component: Component, props }) => {
    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <div className="layout-page">
                    <Header></Header>
                    <Component {...props} />
                </div>
            </div>
            <div className="layout-overlay layout-menu-toggle"></div>
        </div>
    );
};

DefaultRoutes.propTypes = {
    component: PropTypes.any.isRequired,
};

export default DefaultRoutes;

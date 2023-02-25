import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { grantPermission } from "./grantPermission";
import Forbidden from "../../pages/forbidden/Forbidden";
import DefaultRoutes from "./defaultRoutes";

const RoleBasedRouting = ({ component: Component, roles, isDefaultLayout = true, ...rest }) => {
    return (
        <Fragment>
            {grantPermission(roles) && render(isDefaultLayout, Component, rest)}
            {!grantPermission(roles) && <Forbidden />}
        </Fragment>
    );
};

function render(isDefaultLayout, Component, rest) {
    return isDefaultLayout ? <DefaultRoutes {...rest} component={(props) => Component(props)} /> : <Component />;
}

RoleBasedRouting.propTypes = {
    component: PropTypes.any.isRequired,
    roles: PropTypes.any.isRequired,
    isDefaultLayout: PropTypes.bool,
};

export default RoleBasedRouting;

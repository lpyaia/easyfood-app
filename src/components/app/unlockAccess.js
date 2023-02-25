import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { grantPermission } from "./grantPermission";

export const UnlockAccess = ({ children, allowedRoles }) => {
    const permission = grantPermission(allowedRoles);
    return <Fragment>{permission && children}</Fragment>;
};

UnlockAccess.propTypes = {
    children: PropTypes.any.isRequired,
    allowedRoles: PropTypes.any.isRequired,
};

import RoleAccess from "../../enums/roleEnum";

export const grantPermission = (requestedRoles) => {
    if (pageHasNotRestrictions(requestedRoles)) return true;

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const role = userInfo?.userToken?.claims?.find((claim) => claim.type === "role");

    return requestedRoles.includes(role?.value);
};

function pageHasNotRestrictions(requestedRoles) {
    return requestedRoles.includes(RoleAccess.Everybody);
}

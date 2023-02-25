import authService from "../../services/authService/authService";

const Logout = () => {
    authService.logout();
    window.location.href = "/";
};

export default Logout;

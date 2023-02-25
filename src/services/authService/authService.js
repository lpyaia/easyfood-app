import identityApi from "../../utils/identityApi";
import localStorageHelper from "../../utils/localStorageHelper";

const authService = () => {
    const login = async (usuario) => {
        return await identityApi.post("/login", usuario);
    };

    const logout = () => {
        localStorageHelper.clearUserInfo();
    };

    const registro = async (usuario) => {
        const response = await identityApi.post("/register", usuario);

        const userInfo = {
            accessToken: response.data.accessToken,
            claims: response.data.userToken.claims,
        };

        localStorageHelper.setUserInfo(userInfo);

        return userInfo;
    };

    return { login, logout, registro };
};

export default authService();

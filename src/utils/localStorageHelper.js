const localStorageHelper = () => {
    const userInfoKey = "UserInfo";

    const deleteItem = (name) => {
        localStorage.removeItem(name);
    };

    const setItem = (name, object) => {
        if (object) {
            localStorage.setItem(name, JSON.stringify(object));
        }
    };

    const getItem = (name) => {
        return localStorage.getItem(name);
    };

    const setUserInfo = (object) => {
        if (object) {
            setItem(userInfoKey, object);
        }
    };

    const getUserInfo = () => {
        const userInfo = getItem(userInfoKey);

        if (userInfo) {
            return JSON.parse(userInfo);
        }

        return null;
    };

    const clearUserInfo = () => {
        deleteItem(userInfoKey);
    };

    return {
        setItem,
        getItem,
        deleteItem,
        setUserInfo,
        getUserInfo,
        clearUserInfo,
    };
};

export default localStorageHelper();

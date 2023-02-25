import { useState } from "react";
import localStorageHelper from "../../utils/localStorageHelper";

export default function useUserInfo() {
    const getUserInfo = () => {
        return localStorageHelper.getUserInfo();
    };

    const [userInfo, setUserInfo] = useState(getUserInfo);

    const saveToken = (userInfo) => {
        localStorageHelper.setUserInfo(userInfo);

        setUserInfo(userInfo);
    };

    return {
        setUserInfo: saveToken,
        userInfo,
    };
}

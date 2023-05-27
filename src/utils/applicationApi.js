import axios from "axios";
import { toast } from "react-toastify";
import localStorageHelper from "./localStorageHelper";

const configureAxios = () => {
    const userInfo = localStorageHelper.getUserInfo();

    if (userInfo) {
        const axiosInstance = axios.create({
            baseURL: process.env.API_URL,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        });

        axiosInstance.interceptors.response.use(
            function (response) {
                return response.data;
            },
            function (error) {
                debugger;
                if (error?.response) {
                    if (error.response.status === 400) {
                        toast.error(error.response.data.detail);
                    } else if (error.response.status === 401) {
                        localStorage.removeItem("UserInfo");
                        window.location = `/login?url=${window.location.pathname}${window.location.search}`;
                    } else if (error.response.status === 403) {
                        window.location = "/forbidden";
                    } else if (error.response.status >= 500) {
                        window.location = "/sorry";
                    }
                } else {
                    toast.error(error.message);
                }

                return Promise.reject(error);
            }
        );

        return axiosInstance;
    }

    return axios.create({
        baseURL: process.env.API_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 123`,
        },
    });
};

const applicationApi = configureAxios();

export default applicationApi;

import axios from "axios";
import { toast } from "react-toastify";

const identityApi = axios.create({
    baseURL: process.env.IDENTITY_API_URL,
    headers: { "Content-Type": "application/json" },
});

identityApi.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        if (error?.response) {
            if (error.response.status === 400) {
                toast.error(error.response.data.detail);
            } else if (error.response.status === 401) {
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

export default identityApi;

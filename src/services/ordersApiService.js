import applicationApi from "../utils/applicationApi";

const ordersApiService = () => {
    const base = "orders";

    const createOrder = async (data) => {
        return await applicationApi.post(`${base}`, data);
    };

    return { createOrder };
};

export default ordersApiService();

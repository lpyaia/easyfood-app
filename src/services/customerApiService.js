import applicationApi from "../utils/applicationApi";

const customerApiService = () => {
    const base = "customers";

    const getCreditCards = async (customerId) => {
        return await applicationApi.get(`${base}/${customerId}/credit-cards`);
    };

    const createCreditCard = async (customerId, body) => {
        return await applicationApi.post(`${base}/${customerId}/credit-cards`, body);
    };

    const deleteCreditCard = async (customerId, creditCardId) => {
        return await applicationApi.delete(`${base}/${customerId}/credit-cards/${creditCardId}`);
    };

    return { getCreditCards, createCreditCard, deleteCreditCard };
};

export default customerApiService();

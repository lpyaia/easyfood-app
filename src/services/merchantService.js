import applicationApi from "../utils/applicationApi";

const partnerService = () => {
    const base = "partners";

    const getPartnersPaginated = async (page) => {
        return await applicationApi.get(`${base}?page=${page}`);
    };

    const getPartnerMenu = async (partnerId) => {
        return await applicationApi.get(`${base}/${partnerId}/menu`);
    };

    return { getPartnersPaginated, getPartnerMenu };
};

export default partnerService();

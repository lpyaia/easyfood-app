import applicationApi from "../../utils/applicationApi";

const partnerService = () => {
    const base = "partners";

    const getPartnersPaginated = async (page) => {
        return await applicationApi.get(`${base}?page=${page}`);
    };

    return { getPartnersPaginated: getPartnersPaginated };
};

export default partnerService();

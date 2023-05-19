import applicationApi from "../utils/applicationApi";

const partnerService = () => {
    const base = "partners";

    const getPartnersPaginated = async (page, search = "", companyType = []) => {
        let companyTypeParam = "";

        companyType.forEach((item) => (companyTypeParam += "&companyType=" + item));

        return await applicationApi.get(`${base}?page=${page}&search=${search}${companyTypeParam}`);
    };

    const getPartnerMenu = async (partnerId) => {
        return await applicationApi.get(`${base}/${partnerId}/menu`);
    };

    return { getPartnersPaginated, getPartnerMenu };
};

export default partnerService();

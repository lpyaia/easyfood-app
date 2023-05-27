import applicationApi from "../utils/applicationApi";

const partnerService = () => {
    const base = "partners";

    const getPartnersPaginated = async (page, search = "", companyType = [], tags = []) => {
        let companyTypeParam = "";
        let tagsParam = "";

        companyType.forEach((item) => (companyTypeParam += "&companyTypes=" + item));
        tags.forEach((item) => (tagsParam += "&tagsId=" + item.value));

        return await applicationApi.get(`${base}?page=${page}&search=${search}${companyTypeParam}${tagsParam}`);
    };

    const getPartnerMenu = async (partnerId) => {
        return await applicationApi.get(`${base}/${partnerId}/menu`);
    };

    const getTags = async () => {
        return await applicationApi.get(`${base}/tags`);
    };

    return { getPartnersPaginated, getPartnerMenu, getTags };
};

export default partnerService();

export const decimalFormatter = (value, places) => {
    if (value) {
        return value.toFixed(places).toString().replace(".", ",");
    }

    return "0,00";
};

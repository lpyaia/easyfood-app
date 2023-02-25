export const decimalFormatter = (value, places) => {
    return value.toFixed(places).toString().replace(".", ",");
};

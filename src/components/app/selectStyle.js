export const selectStyle = {
    multiValueRemove: (provided) => ({
        ...provided,
        color: "#fff",
        backgroundColor: "#881e83",
        borderRadius: "0 0.375rem 0.375rem 0",
        paddingTop: "5%",
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: "#fff",
        backgroundColor: "#881e83",
        borderRadius: "0.375rem 0 0 0.375rem",
        padding: "5px",
    }),
    clearIndicator: (provided) => ({
        ...provided,
        color: "#881e83",
        ":hover": {
            color: "#881e83",
        },
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        color: "#881e83",
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        backgroundColor: "#881e83",
        ":hover": {
            color: "#881e83",
        },
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: "#881e83",
        ":hover": {
            color: "#881e83",
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: "#881e83",
    }),
    option: (provided) => ({
        ...provided,
        color: "#881e83",
    }),
    control: (provided, state) => ({
        ...provided,
        borderColor: "#881e83",
        backgroundColor: "#fff",
        boxShadow: "#881e83",
        ":hover": {
            borderColor: "#881e83",
        },
    }),
};

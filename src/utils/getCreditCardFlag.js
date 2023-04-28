export const getCreditCardFlagByCardNumber = (creditCardNumber) => {
    if (/^4/.test(creditCardNumber)) {
        return "./visa-logo.png";
    } else if (/^5[1-5]/.test(creditCardNumber)) {
        return "/mastercard-logo.png";
    } else if (/^3[47]/.test(creditCardNumber)) {
        return "/americanexpress-logo.png";
    }
};

export const getCreditCardFlagByEnum = (creditCardFlagEnum) => {
    if (creditCardFlagEnum === 1) {
        return "./visa-logo.png";
    }

    if (creditCardFlagEnum === 2) {
        return "/mastercard-logo.png";
    }

    if (creditCardFlagEnum === 3) {
        return "/americanexpress-logo.png";
    }
};

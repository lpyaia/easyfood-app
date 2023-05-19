import React, { useState } from "react";
import { useEffect } from "react";

export const SwitchButton = ({ checked = false, onClick, children }) => {
    const uncheckedStyle = "btn-outline-easyfood";
    const checkedStyle = "btn-easyfood";
    const [check, setCheck] = useState(checked);
    const [style, setStyle] = useState(uncheckedStyle);

    useEffect(() => {
        if (checked) {
            setStyle(checkedStyle);
        } else {
            setStyle(uncheckedStyle);
        }
        setCheck(checked);
    }, [checked]);

    const changeState = () => {
        const newState = !check;

        if (newState) {
            setStyle(checkedStyle);
        } else {
            setStyle(uncheckedStyle);
        }

        setCheck(newState);
        onClick(newState);
    };

    return (
        <>
            <div className={`btn ${style}`} onClick={() => changeState()}>
                {children}
            </div>
        </>
    );
};

import React from "react";
import { ClipLoader } from "react-spinners";
import { createStore, useStore } from "react-hookstore";

createStore("spinnerEnabled", false);

const Spinner = () => {
    const style = {
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        backgroundColor: "#eceaea",
        backgroundPosition: "center",
        backgroundSize: "150px",
        zIndex: 1000000,
        opacity: 0.8,
    };

    const css = {
        position: "fixed",
        top: "calc(50% - 100px)",
        left: "calc(50% - 100px)",
        height: "150px",
        width: "150px",
    };

    const [isEnabled] = useStore("spinnerEnabled");

    return (
        <div>
            {isEnabled && (
                <div style={style}>
                    <ClipLoader color={"#000000"} loading={isEnabled} size={150} css={css} />
                </div>
            )}
        </div>
    );
};

export default Spinner;
